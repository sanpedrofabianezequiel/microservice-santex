import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigCustomModule } from '../config/config.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
  imports: [
    ConfigCustomModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigCustomModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('POSTGRES_HOST'),
        port: +configService.getOrThrow<number>('POSTGRES_PORT'),
        database: configService.getOrThrow<string>('POSTGRES_DB'),
        username: configService.getOrThrow<string>('POSTGRES_USER'),
        password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
        autoLoadEntities: true,
        synchronize: true,
        ssl:
          configService.getOrThrow<string>('STATE') === 'dev'
            ? { rejectUnauthorized: false, sslmode: 'require' }
            : (false as any),
      }),
    }),
  ],
  providers: [TypeOrmModule],
  exports: [TypeOrmModule],
})
export class DatabaseModule {
  static forFeature(entities: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(entities);
  }
}
