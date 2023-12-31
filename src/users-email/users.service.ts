import { Response } from 'express';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from '../../prisma/prisma.service';
import * as uuid from 'uuid';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth-email/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  async createUser(username: string, email: string, password: string) {
    const userExists = await this.checkUserExists(email);
    if (userExists) {
      throw new UnprocessableEntityException('User already exists');
    }

    const signupVerifyToken = uuid.v1();
    try {
      await this.emailService.sendMemberJoinVerification(
        email,
        signupVerifyToken,
      );
    } catch (error) {
      throw new InternalServerErrorException('Email sending failed');
    }

    try {
      await this.prisma.users.create({
        data: {
          username,
          email,
          password,
          signupVerifyToken,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('User creation failed');
    }
  }

  private async checkUserExists(email: string): Promise<boolean> {
    const user = await this.prisma.users.findUnique({ where: { email } });
    return !!user;
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    const user = await this.prisma.users.findUnique({
      where: { signupVerifyToken },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      await this.prisma.users.update({
        where: { userId: user.userId },
        data: { signupVerifyToken: null },
      });
    } catch (error) {
      throw new InternalServerErrorException('Email verification failed');
    }

    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new InternalServerErrorException('JWT_SECRET is not defined');
    }
    return this.authService.login({
      id: user.userId,
      username: user.username,
      email: user.email,
    });
  }

  async login(res: Response, email: string, password: string): Promise<void> {
    const user = await this.prisma.users.findUnique({
      where: { email, password },
    });
    if (!user || user.signupVerifyToken !== null) {
      throw new NotFoundException('User not found or email not verified');
    }

    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new InternalServerErrorException('JWT_SECRET is not defined');
    }

    const token = this.authService.login({
      id: user.userId,
      username: user.username,
      email: user.email,
    });
    res.setHeader('Authorization', `Bearer ${token}`);
    res.send({ message: 'login successful' });
    res.cookie('Authorization', `Bearer ${token}`);
  }

  async getUserInfo(userId: string) {
    const user = await this.prisma.users.findUnique({
      where: { userId: Number(userId) },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      userId: user.userId,
      username: user.username,
      email: user.email,
    };
  }

  async removeUser(userId: string) {
    try {
      const user = await this.prisma.users.delete({
        where: { userId: Number(userId) },
      });
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
