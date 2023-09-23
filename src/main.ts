// src/main.ts
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
