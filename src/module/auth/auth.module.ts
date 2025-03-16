import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { CustomLogger } from 'src/core/logger/winston.logger';
import { TokenService } from './services/token.service';

@Module({
  providers: [AuthService, CustomLogger, TokenService],
  controllers: [AuthController],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
