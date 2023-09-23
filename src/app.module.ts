// app.module.ts
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { BoardsModule } from './boards/boards.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './logger/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { ColumnsModule } from './columns/columns.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    BoardsModule,
    ColumnsModule,
    CardsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, AppService],
}) 

export class AppModule implements NestModule { //로거미들웨어적용
  configure(consumer: MiddlewareConsumer) { //모듈 데코레이터에는 미들웨어를 위한 장소가 없으므로 configure모듈 클래스의 메서드 사용하여 설정
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
