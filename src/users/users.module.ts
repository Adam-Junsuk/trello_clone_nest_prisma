import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from './../prisma/prisma.module';
//user모듈에서도 auth모듈 임포트, auth에서도 user모듈 입포트, 순환참조 생김
//순환종속성 해결위해 forwardReF함수 사용
@Module({
  imports: [forwardRef(() => AuthModule), PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
