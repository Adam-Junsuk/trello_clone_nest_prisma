// users.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Users } from '@prisma/client';
// import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.users.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );
    createUserDto.password = hashedPassword;

    return await this.prisma.users.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.users.findUnique({ where: { userId: id } });
    if (!user) {
      throw new Error('User not found');
    }
    return this.prisma.users.findUnique({ where: { userId: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    const user = await this.prisma.users.findUnique({ where: { userId: id } });
    if (!user) {
      throw new Error('User not found');
    }
    return this.prisma.users.update({
      where: { userId: id },
      data: {
        username: updateUserDto.username,
        password: updateUserDto.password,
        email: updateUserDto.email,
      },
      // data: updateUserDto,
    });
  }
  async remove(id: number) {
    const user = await this.prisma.users.findUnique({ where: { userId: id } });
    if (!user) {
      throw new Error('User not found');
    }
    return this.prisma.users.delete({ where: { userId: id } });
  }
}

// minjung's code start
//   async createUser(data: CreateUserDto) {
//     //이메일, 패스워드, 등 데이터 들어오는거 유효성검사 수행, 패스워드 암호화, db에 저장
//     console.log(data);
//     const { username, password, email } = data;
//     console.log(email);
//     const isUserExist = await this.prisma.users.findUnique({
//       where: { email: email },
//     });
//     console.log('is ', isUserExist);
//     if (isUserExist) throw new UnauthorizedException('중복된 이메일 입니다.'); //httpexception, 403이랑 같음

//     const hashedPassword = await bcrypt.hash(password, 10);

//     return await this.prisma.users.create({
//       data: {
//         username,
//         password: hashedPassword,
//         email,
//       },
//       select: {
//         userId: true,
//         username: true,
//         email: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });
//   }

//   async findUserByEmail(email: string) {
//     const user = await this.prisma.users.findFirst({ where: { email: email } });
//     return user;
//   }

//   async findUserById(id: number) {
//     const user = await this.prisma.users.findUnique({ where: { userId: id } });
//     return user;
//   }
// }
// minjung's code end
