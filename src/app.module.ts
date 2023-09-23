// app.module.ts
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { LoggingModule } from './logging/logging.module';
import emailConfig from './config/emailConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      load: [emailConfig],
      isGlobal: true,
    }),
    PrismaModule, // 추가
    BoardsModule,
    ColumnsModule,
    CardsModule,
    CommentsModule,
    UsersModule,
    EmailModule,
    AuthModule,
    LoggingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
