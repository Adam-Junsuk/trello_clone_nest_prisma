// src/main.ts
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join, resolve } from 'path';
import * as dotenv from 'dotenv';
import session from 'express-session';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    session({
      secret: 'GOOGLE_SECRET',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.useStaticAssets(join('..', 'trello_clone_nest_prisma', 'public'));
  app.setBaseViewsDir(
    join('..', 'trello_clone_nest_prisma', 'public', 'views'),
  );
  app.setViewEngine('hbs');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Trello Clone API')
    .setDescription('The Trello Clone API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
