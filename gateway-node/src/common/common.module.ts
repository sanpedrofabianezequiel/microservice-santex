import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { ConfigCustomModule } from './config/config.module';

@Module({
  imports: [
    ConfigCustomModule,
    //LoggerModule/*//TODO: uncomment this line to enable logging*/,
  ],
  providers: [ConfigCustomModule],
  exports: [ConfigCustomModule],
})
export class CommonModule {}
