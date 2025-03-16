import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MemberModule } from './module/member/member.module';
import { typeORMConfig } from './db/typeorm.config'; // 수정된 TypeORM 설정 파일 import
import { CustomLogger } from './core/logger/winston.logger';
import { CustomLoggerModule } from './core/logger/logger.module';
import { LogMiddleware } from './core/logger/middleware/log.middleware';
import { AuthMiddleware } from './core/logger/middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `envs/.env.${process.env.APP_ENV ?? 'local'}`, // 환경 파일 설정
      isGlobal: true, // 전역 설정
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, CustomLoggerModule], // ConfigModule을 import
      useFactory: (configService: ConfigService) =>
        typeORMConfig(configService), // 비동기로 TypeORM 설정 로드
      inject: [ConfigService, CustomLogger], // ConfigService 주입
    }),
    MemberModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LogMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    consumer.apply(AuthMiddleware);
  }
}
