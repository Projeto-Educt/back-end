import { AppModule } from '@/nest/app.module';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';

const initServer = async () => {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app = module.createNestApplication();
  await app.init();
  return app;
};

export const testeServer = async () => {
  const app = await initServer();
  return { server: supertest(app.getHttpServer()), app };
};
