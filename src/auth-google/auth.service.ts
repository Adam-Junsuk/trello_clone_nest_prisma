import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ApiTags } from '@nestjs/swagger';

interface SignupParams {
  username: string;
  email: string;
  password: string;
}

interface SigninParams {
  email: string;
  password: string;
}

@Injectable()
@ApiTags('auth')
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async signup({ email, password, username }: SignupParams) {
    const userExists = await this.prismaService.users.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new BadRequestException('email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return this.generatedJWT(username, user.userId);
  }

  async signin({ email, password }: SigninParams) {
    const user = await this.prismaService.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('Not matched the email');
    }

    const hashedPassword = user.password;

    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      throw new NotFoundException('Not matched the password');
    }

    return this.generatedJWT(user.username, user.userId);
  }

  private generatedJWT(username: string, userId: number) {
    return jwt.sign(
      {
        username,
        userId,
      },
      process.env.JSON_TOKEN_KEY,
      {
        expiresIn: 3600000,
      },
    );
  }
}
