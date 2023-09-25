import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
// src/auth/auth.module.ts
import authConfig from '../config/authConfig'; // 경로를 확인해주세요.

@Module({
  imports: [
    PrismaModule,
    PassportModule,
//     JwtModule.register({
//       secret: jwtSecret,
//       signOptions: { expiresIn: jwtExpirationTime },
//     }),
    ConfigModule.forFeature(authConfig), // Import ConfigModule for authConfig
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1y' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
