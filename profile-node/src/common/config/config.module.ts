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
        STATE: Joi.string()
          .required()
          .valid('dev', 'prod', 'test')
          .default('dev'),
        PORT: Joi.number().required().default(3002),
        POSTGRES_HOST: Joi.string().required().default('localhost'),
        POSTGRES_PORT: Joi.number().required().default(5432),
        POSTGRES_USER: Joi.string().required().default('postgres'),
        POSTGRES_PASSWORD: Joi.string().required().default('postgres'),
        POSTGRES_DB: Joi.string().required().default('postgres'),
        JWT_SECRET: Joi.string().required().default('secret'),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigCustomModule {}
