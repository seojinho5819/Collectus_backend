import { Module } from '@nestjs/common';
import { HttpResponseProvider } from './response.provider';

@Module({
  providers: [HttpResponseProvider],
  exports: [HttpResponseProvider],
})
export class ResponseModule {}
