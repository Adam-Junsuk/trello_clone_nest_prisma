//src/auth/auth.service.ts

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';
// import { RedisService } from 'nestjs-redis';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService, // private redisService: RedisService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // step 1: fetch a uesr from prisma with a given email address
    const user = await this.prisma.users.findUnique({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException(`User not found for email: ${email}`);
    }

    // step 2: compare a given password with a password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Redis를 확인하여 이미 로그인되어 있는지 확인
    // const redisClient = this.redisService.getClient();
    // const isAlreadyLoggedIn = await redisClient.get(`auth_${user.userId}`);
    // if (isAlreadyLoggedIn) {
    //   throw new UnauthorizedException('Already logged in');
    // }

    // step 3: generate a JWT token containing the user id and return it
    const payload = { userId: user.userId };
    const accesstoken = this.jwtService.sign(payload);

    // 로그인 상태를 Redis에 저장 (expire time: 1 hour)
    // await redisClient.set(`auth_${user.userId}`, accesstoken, 'ex', 60 * 60);
    return { accessToken: accesstoken };
  }
}
