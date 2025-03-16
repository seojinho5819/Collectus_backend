import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './core/logger/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // 이 설정이 없으면 NestJS 앱이 구동되는 초반에 잠시동안 내장 로거가 사용됨
  });
  app.useLogger(app.get(CustomLogger));
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  app.setGlobalPrefix('api');
  await app.listen(port);
}
bootstrap();
