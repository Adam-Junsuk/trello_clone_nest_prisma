// src/users/users.module.ts
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

import { Module } from '@nestjs/common';
// import { forwardRef, Module } from '@nestjs/common';
//user모듈에서도 auth모듈 임포트, auth에서도 user모듈 입포트, 순환참조 생김
//순환종속성 해결위해 forwardReF함수 사용

@Module({
  imports: [PrismaModule],
//imports: [forwardRef(() => AuthModule), PrismaModule], // minjung's code
  controllers: [UsersController],
  providers: [UsersService],
//exports: [UsersService], // minjung's code
})
export class UsersModule {}
