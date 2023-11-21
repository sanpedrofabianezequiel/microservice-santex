import { Module } from '@nestjs/common';
import { ConfigCustomModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigCustomModule,
    DatabaseModule /*LoggerModule*/ /*//TODO: uncomment this line to enable logging*/,
  ],
  providers: [ConfigCustomModule, DatabaseModule],
  exports: [ConfigCustomModule, DatabaseModule],
})
export class CommonModule {}
