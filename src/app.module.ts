import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BoardsModule } from './boards/boards.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { CommentsService } from './comments/comments.service';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './logger/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users-email/users.module';
import { ColumnsModule } from './columns/columns.module';
import { AuthModule } from './auth-basic/auth.module';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { AuthModule as Emodule } from './auth-email/auth.module';
import { LoggingModule } from './logging/logging.module';
import emailConfig from './config/emailConfig';
import { PrismaService } from './prisma/prisma.service';
import { GoogleStrategy } from './auth-google/google-auth.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      load: [emailConfig],
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    Emodule,
    PrismaModule,
    BoardsModule,
    ColumnsModule,
    CardsModule,
    CommentsModule,
    EmailModule,
    LoggingModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, AppService, CommentsService, GoogleStrategy],
})
export class AppModule implements NestModule {
  //로거미들웨어적용
  configure(consumer: MiddlewareConsumer) {
    //모듈 데코레이터에는 미들웨어를 위한 장소가 없으므로 configure모듈 클래스의 메서드 사용하여 설정
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
