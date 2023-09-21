// app.module.ts
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { BoardsModule } from './boards/boards.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { ColumnsModule } from './columns/columns.module';
import { AuthModule } from './auth/auth.module';
// import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // RedisModule.register({
    //   url: process.env.REDIS_URL,
    // }),
    // RedisModule.forRootAsync({
    //   useFactory: () => ({
    //     url: process.env.REDIS_URL,
    //   }),
    // }),
    UsersModule,
    BoardsModule,
    CardsModule,
    CommentsModule,
    UsersModule,
    ColumnsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
