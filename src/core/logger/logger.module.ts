import { Module } from '@nestjs/common';
import { CustomLogger } from './winston.logger';

@Module({
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class CustomLoggerModule {}
