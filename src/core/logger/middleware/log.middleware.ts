import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from '../winston.logger';
import { v4 as uuidv4 } from 'uuid';
import localStorage from '../local.storage';

const customLogger = new CustomLogger();
const logger = customLogger.logCreate(__filename);

@Injectable()
export class LogMiddleware implements NestMiddleware {
  private generateRequestId(): string {
    return uuidv4(); // UUIDv4를 사용하여 고유한 ID를 생성
  }

  use(request: Request, response: any, next: NextFunction): void {
    const { method, path, query, body } = request;
    const requestedTime = Date.now();
    const syncStorageItem: any = {};
    syncStorageItem.requestId = this.generateRequestId();
    syncStorageItem.requestedTime = requestedTime;

    localStorage.run({ syncStorageItem }, () => {
      if (path !== '/') {
        logger.info(`${method} ${path} start`);
      }

      if (Object.keys(query).length) {
        logger.info(`query: ${path} ${JSON.stringify(query)}`);
      }

      if (body && Object.keys(body).length) {
        logger.info(`body: ${path} ${JSON.stringify(body)}`);
      }

      // 응답이 끝났을 때
      response.on('finish', () => {
        const elapsedTime = Date.now() - requestedTime;
        if (path !== '/') {
          logger.info(
            `${method} ${path} finished in ${elapsedTime}ms (${
              response.body.code || response.body.code === 0
                ? response.body.code
                : response.status
            } ${response.body.message ? response.body.message : 'html'})`,
          );
        }
      });
      next();
    });
  }
}
