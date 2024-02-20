import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(new ValidationPipe());

  //enable cors for localhost:3000
  app.useLogger(new Logger('global'));

  app.enableCors();

  await app.listen(4000);
}
bootstrap();
