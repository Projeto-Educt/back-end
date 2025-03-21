/*
 * @jest-environment ./src/main/config/jest.environment.ts
 */

import { testeServer } from '@/main/config/supertest';
import { ClientDb } from '@/main/helpers/client-db-helper';
import type TestAgent from 'supertest/lib/agent';
import { makeCryptographyUserAdapter } from '../factories/adapter/cryptography.factory';

describe('user routes', () => {
  let app: any;
  let server: TestAgent;
  let dbClient: ClientDb;

  const dataUser = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '@Password123',
    confirmPassword: '@Password123',
  };

  beforeAll(async () => {
    const { app: a, server: s } = await testeServer();
    app = a;
    server = s;

    dbClient = await ClientDb.getClient();
  });

  beforeEach(async () => {
    await dbClient.user.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should create a user', async () => {
    await server.post('/user?callbackUrl=http://localhost:3000').send(dataUser).expect(204);
  });

  it('Should resend email confirmation', async () => {
    await server.post('/user?callbackUrl=http://localhost:3000').send(dataUser).expect(204);
    await server
      .post('/user/resend-register-email?callbackUrl=http://localhost:3000')
      .send({
        email: dataUser.email,
      })
      .expect(204);
  });

  it('Should active user', async () => {
    const callbackUrl = 'http://localhost:4000';
    const crypto = makeCryptographyUserAdapter();
    const token = crypto.encrypt(`${dataUser.email}--${callbackUrl}`);

    await server.post(`/user?callbackUrl=${callbackUrl}`).send(dataUser).expect(204);

    const response = await server.get(`/user/activate?token=${token}`);
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe(callbackUrl);
  });
});
