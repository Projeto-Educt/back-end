import { SERVER_ENV } from '@/main/config/env';
import { swaggerSetup } from '@/main/config/swagger-setup';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import { AppModule } from './app.module';
import { corsOptionsConfig } from './configs/cors-setup';
import { sessionConfig } from './configs/session-setup';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptionsConfig);
  app.use(session(sessionConfig));
  swaggerSetup(app, '/api');
  await app.listen(SERVER_ENV.port);
}
bootstrap();
