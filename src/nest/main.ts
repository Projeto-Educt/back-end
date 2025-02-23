import { SERVER_ENV } from '@/main/config/env';
import { swaggerSetup } from '@/main/config/swagger-setup';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  swaggerSetup(app, '/api');
  await app.listen(SERVER_ENV.port);
}
bootstrap();
