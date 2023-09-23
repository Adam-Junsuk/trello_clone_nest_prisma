import { AuthModule } from '../auth-email/auth.module';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EmailService } from 'src/email/email.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService, EmailService, PrismaModule],
})
export class UsersModule {}
