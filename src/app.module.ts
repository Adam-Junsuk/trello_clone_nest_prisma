// app.module.ts
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service'; // 추가
import { BoardsModule } from './boards/boards.module';
import { BoardsService } from './boards/boards.service';
import { AppService } from './app.service';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './logger/logger.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BoardsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, BoardsService],
}) //모듈 데코레이터에는 미들웨어를 위한 장소가 없으므로 configure모듈 클래스의 메서드 사용하여 설정
//로거미들웨어적용
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
