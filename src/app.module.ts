import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { AppService } from './app.service';
import { CommentsService } from './comments/comments.service';
import { GoogleStrategy } from './users/auth/google-auth.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BoardsModule,
    ColumnsModule,
    CardsModule,
    CommentsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, AppService, CommentsService, GoogleStrategy],
})
export class AppModule {}
