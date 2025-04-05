import { AppModule } from '@/nest/app.module';
import { sessionConfig } from '@/nest/configs/session-setup';
import { Test } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import supertest from 'supertest';

const initServer = async () => {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app = module.createNestApplication();
  app.use(cookieParser());
  app.use(session(sessionConfig));
  await app.init();
  return app;
};

export const testeServer = async () => {
  const app = await initServer();
  const agent = supertest.agent(app.getHttpServer());
  return { server: agent, app };
};
