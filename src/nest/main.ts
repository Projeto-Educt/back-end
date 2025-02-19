import { SERVER_ENV } from '@/main/config/env';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(SERVER_ENV.port);
}
bootstrap();
