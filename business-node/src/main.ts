import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: '*',
  });
  /*app.useLogger(app.get(Logger));*/ //TODO: uncomment this line to enable logging
  await app.listen(process.env.PORT || 3003);
}
bootstrap();
