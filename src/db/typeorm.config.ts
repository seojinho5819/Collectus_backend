import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { CustomLogger } from 'src/core/logger/winston.logger';

export const typeORMConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const DB_LOGGING: boolean = configService.get('DB_LOGGING', false);
  const DB_SYNC: boolean = configService.get('DB_SYNC', false);

  return {
    type: 'postgres',
    host: configService.get('DB_HOST'), // ConfigService를 사용하여 환경 변수 가져오기
    port: Number(configService.get('DB_PORT')), // DB_PORT를 Number로 변환
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASS'),
    database: configService.get('DB_NAME'),
    entities: [join(__dirname, '../module/**/entities/*.entity.{ts,js}')],
    synchronize: Boolean(DB_SYNC),
    logging: Boolean(DB_LOGGING),
    logger: new CustomLogger(),
  };
};
