// app.module.ts
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { BoardsModule } from './boards/boards.module';
// import { ColumnsModule } from './columns1/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { ColumnsModule } from './columns/columns.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BoardsModule,
    // ColumnsModule,
    CardsModule,
    CommentsModule,
    UsersModule,
    ColumnsModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
