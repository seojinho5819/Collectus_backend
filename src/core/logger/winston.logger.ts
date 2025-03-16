import { Injectable, LoggerService } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import localStorage from './local.storage';

const logDir = __dirname + '/../../logs'; // 로그 파일 저장 폴더

@Injectable()
export class CustomLogger implements LoggerService {
  private winstonLogger: winston.Logger;
  private PROJECT_NAME: string = process.env.PROJECT_NAME || 'Collectus';
  constructor() {
    this.winstonLogger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.sssZ' }), // 타임스탬프 포맷 지정
            winston.format.printf(
              (info: { timestamp: string; level: string; message: any }) => {
                return `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`;
              },
            ),
            nestWinstonModuleUtilities.format.nestLike(this.PROJECT_NAME, {
              prettyPrint: true,
            }),
          ),
        }),
        new winstonDaily(this.dailyOptions('info')),
        new winstonDaily(this.dailyOptions('warn')),
        new winstonDaily(this.dailyOptions('error')),
      ],
    });
  }

  private getTimeString(): string {
    // 시간 포맷을 직접 지정하여 출력
    const now = new Date();
    return now.toISOString(); // 'YYYY-MM-DDTHH:mm:ss.sssZ' 형태로 반환
  }
  private dailyOptions(level: string) {
    return {
      level,
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/${level}`,
      filename: `%DATE%.${level}.log`,
      maxFiles: 30, // 30일치 로그 보관
      zippedArchive: true, // 압축 저장
    };
  }

  /**
   * 로그 메시지 변환
   */
  private _toMessage(
    MODULE_NAME: string,
    args: any[],
    singleLineMode?: boolean,
  ): string {
    const alsStore = localStorage.getStore();
    const req: any = alsStore ? alsStore : undefined;
    const reqId = req && req.anyReq?.reqId ? `<${req.anyReq.reqId}> ` : '';

    const separator = singleLineMode ? ' ' : '\n';
    const message = args
      .map((arg) => (arg !== undefined ? String(arg) : ''))
      .join(separator);

    return `${reqId}[${MODULE_NAME}] ${message}`;
  }

  /**
   * 로그 인터페이스 구현 (NestJS LoggerService)
   */
  log(message: any, ...optionalParams: any[]) {
    this.winstonLogger.info(
      this._toMessage(this.PROJECT_NAME, [message, ...optionalParams], true),
    );
  }

  error(message: any, ...optionalParams: any[]) {
    this.winstonLogger.error(
      this._toMessage(this.PROJECT_NAME, [message, ...optionalParams], true),
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    this.winstonLogger.warn(
      this._toMessage(this.PROJECT_NAME, [message, ...optionalParams], true),
    );
  }

  debug(message: any, ...optionalParams: any[]) {
    this.winstonLogger.debug(
      this._toMessage(this.PROJECT_NAME, [message, ...optionalParams], true),
    );
  }

  verbose(message: any, ...optionalParams: any[]) {
    this.winstonLogger.verbose(
      this._toMessage(this.PROJECT_NAME, [message, ...optionalParams], true),
    );
  }

  logQuery(query: string, parameters?: any[]) {
    this.winstonLogger.info(`Query: ${query}, Parameters: ${parameters}`);
  }

  logQueryError(error: string, query: string, parameters?: any[]) {
    this.winstonLogger.error(
      `Query Error: ${error}, Query: ${query}, Parameters: ${parameters}`,
    );
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    this.winstonLogger.warn(
      `Slow Query: ${time}ms, Query: ${query}, Parameters: ${parameters}`,
    );
  }

  logSchemaBuild(message: string) {
    this.winstonLogger.info(`Schema Build: ${message}`);
  }

  logMigration(message: string) {
    this.winstonLogger.info(`Migration: ${message}`);
  }

  /**
   * 특정 파일에서 로그 객체 생성
   */
  logCreate(__filename: string, singleLineMode: boolean = true) {
    const MatchedFile = /([^/\\]+?)\.(js|ts)$/.exec(__filename);
    const MODULE_NAME =
      MatchedFile && MatchedFile[1] ? MatchedFile[1] : 'Unknown';

    return {
      debug: (...args: any[]) =>
        this.winstonLogger.debug(
          this._toMessage(MODULE_NAME, args, singleLineMode),
        ),
      info: (...args: any[]) =>
        this.winstonLogger.info(
          this._toMessage(MODULE_NAME, args, singleLineMode),
        ),
      warn: (...args: any[]) =>
        this.winstonLogger.warn(
          this._toMessage(MODULE_NAME, args, singleLineMode),
        ),
      error: (...args: any[]) =>
        this.winstonLogger.error(
          this._toMessage(MODULE_NAME, args, singleLineMode),
        ),
    };
  }
}
