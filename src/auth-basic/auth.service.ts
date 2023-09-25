import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  validateOAuthLogin(profile: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // step 1: fetch a uesr from prisma with a given email address
    const user = await this.prisma.users.findUnique({
      where: { email: email },
    });
    if (!user) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    // step 2: compare a given password with a password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    // step 3: generate a JWT token containing the user id and return it
    const payload = { userId: user.userId };
    const accesstoken = this.jwtService.sign(payload);
    return { accessToken: accesstoken };

  }
}
