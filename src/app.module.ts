// app.module.ts
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service'; // 추가
import { BoardsModule } from './boards/boards.module';
import { BoardsService } from './boards/boards.service';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BoardsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, BoardsService],
  exports: [PrismaService],
})
export class AppModule {}
