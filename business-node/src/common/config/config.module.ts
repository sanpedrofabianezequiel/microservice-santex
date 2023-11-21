import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object({
        STATE: Joi.string().valid('dev', 'prod', 'test').default('dev'),
        PORT: Joi.number().default(3002),
        POSTGRES_HOST: Joi.string().default('localhost'),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_USER: Joi.string().default('postgres'),
        POSTGRES_PASSWORD: Joi.string().default('postgres'),
        POSTGRES_DB: Joi.string().default('postgres'),
        JWT_SECRET: Joi.string().default('secret'),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigCustomModule {}
