import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { BoardsModule } from './boards/boards.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { CommentsService } from './comments/comments.service';
import { UsersModule } from './users-email/users.module';
import { ColumnsModule } from './columns/columns.module';
import { AuthModule } from './auth-basic/auth.module';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { AuthModule as Emodule } from './auth-email/auth.module';
import { LoggingModule } from './logging/logging.module';
import emailConfig from './config/emailConfig';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { GoogleStrategy } from './auth-google/google-auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { SearchService } from './search/search.service';
import { LoggerMiddleware } from './logger/logger.middleware';
import { SearchModule } from './search/search.module';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node:
          configService.get<string>('ELASTIC_NODE') || 'http://localhost:9200',
        auth: {
          username: configService.get<string>('ELASTIC_USERNAME'),
          password: configService.get<string>('ELASTIC_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: '../.env',
      load: [emailConfig],
      isGlobal: true,
    }),
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
    PassportModule.register({ defaultStrategy: 'google' }),
    SearchModule,
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    AppService,
    CommentsService,
    GoogleStrategy,
    SearchService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
