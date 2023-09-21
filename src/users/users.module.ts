import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService, EmailService],
})
export class UsersModule {}
