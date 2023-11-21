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
        PORT: Joi.number().required().default(3001),
        PROFILE_NODE_URL: Joi.string()
          .required()
          .default('http://localhost:3002/graphql'),
        BUSINESS_NODE_URL: Joi.string()
          .required()
          .default('http://localhost:3003/graphql'),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigCustomModule {}
