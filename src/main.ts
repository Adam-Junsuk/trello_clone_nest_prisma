// src/main.ts
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // path problem
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'public', 'views'));

  // solution1
  app.useStaticAssets(join('..', 'trello_clone_nest_prisma', 'public'));
  app.setBaseViewsDir(
    join('..', 'trello_clone_nest_prisma', 'public', 'views'),
  );
  // app.setViewEngine('ejs');
  app.setViewEngine('hbs');
  // solution2
  // app.useStaticAssets(resolve('..', 'public'));
  // app.setBaseViewsDir(resolve('public', 'views'));
  // app.setViewEngine('ejs');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true })); // /*TODO: Error나면 transform:true 부분을 확인/
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  //   app.useGlobalPipes(new ValidationPipe({ transform: true })); // minjung's code

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
