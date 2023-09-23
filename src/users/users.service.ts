import {
  //HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    //이메일, 패스워드, 등 데이터 들어오는거 유효성검사 수행, 패스워드 암호화, db에 저장
    console.log(data);
    const { username, password, email } = data;
    console.log(email);
    const isUserExist = await this.prisma.users.findUnique({
      where: { email: email },
    });
    console.log('is ', isUserExist);
    if (isUserExist) throw new UnauthorizedException('중복된 이메일 입니다.'); //httpexception, 403이랑 같음

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
      select: {
        userId: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.users.findFirst({ where: { email: email } });
    return user;
  }

  async findUserById(id: number) {
    const user = await this.prisma.users.findUnique({ where: { userId: id } });
    return user;
  }
}
//   async signIn(data: LoginUserDto) {
//     const { username, password } = data;
//     const user = await this.prisma.users.findFirst({
//       where: { username },
//     });
//     if (user && (await bcrypt.compare(password, user.password))) {
//       return 'success';
//     } else {
//       throw new UnauthorizedException('로그인 실패');
//     }
//   }
// }

// {
//     username,
//     password,
//   }

//   async createBoard(data: Prisma.BoardsCreateInput) {
//     return this.prisma.boards.create({
//       data,
//     });
//   }
