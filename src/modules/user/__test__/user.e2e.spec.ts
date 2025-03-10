/*
 * @jest-environment ./src/main/config/jest.environment.ts
 */

import { testeServer } from '@/main/config/supertest';
import type TestAgent from 'supertest/lib/agent';

describe('user routes', () => {
  let app: any;
  let server: TestAgent;

  beforeAll(async () => {
    const { app: a, server: s } = await testeServer();
    app = a;
    server = s;
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should create a user', async () => {
    await server
      .post('/user?callbackUrl=http://localhost:3000')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '@Password123',
        confirmPassword: '@Password123',
      })
      .expect(204);
  });
});
