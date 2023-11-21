import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Callback, Context, Handler } from 'aws-lambda';
import { configure } from '@vendia/serverless-express';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

let server: Handler = null;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  await app.init();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: '*',
  });
  //app.useLogger(app.get(Logger))
  return configure({
    app: app.getHttpAdapter().getInstance(),
  });
}

export const handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
