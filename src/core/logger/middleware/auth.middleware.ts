import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/module/auth/services/token.service';
//import { CustomLogger } from '../winston.logger';

// const customLogger = new CustomLogger();
// const logger = customLogger.logCreate(__filename);

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    //private customLogger: CustomLogger,
    private tokenService: TokenService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      try {
        const accessToken = authHeader.split(' ')[1];
        req.user = await this.tokenService.verifyToken(accessToken);
      } catch (error: any) {
        res.cookie('', '', { maxAge: 0 });
        if (error.message === 'jwt expired') {
          throw new HttpException('jwt expired', HttpStatus.UNAUTHORIZED);
        }
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
    }

    next();
  }
}
