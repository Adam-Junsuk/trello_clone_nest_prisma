//src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv';
dotenv.config();
export const jwtSecret = process.env.JWT_SECRET;
export const jwtExpirationTime = process.env.JWT_EXPIRATION_TIME;

console.log(process.env.JWT_SECRET);
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: jwtExpirationTime }, // e.g. 30s, 7d, 24h
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})

// Minjung's code start
// import { forwardRef, Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { UsersModule } from '../users/users.module';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './jwt/jwt.strategy';

// @Module({
//   imports: [
//     PassportModule.register({ defaultStrategy: 'jwt', session: false }),
//     //strategy 에 대한 기본적인 설정을 할 수 있음.
//     JwtModule.register({
//       secret: process.env.JWT_SECRET,
//       signOptions: { expiresIn: '1y' },
//     }),
//     forwardRef(() => UsersModule), //user모듈에 export된거들어감
//   ],
//   providers: [AuthService, JwtStrategy],
//   exports: [AuthService],
// Minjung's code end
export class AuthModule {}
