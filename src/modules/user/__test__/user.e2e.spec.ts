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
    id: '123e4567-e89b-12d3-a456-426614174000',
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
    const response = await server.post('/user?callbackUrl=http://localhost:3000').send(dataUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
    });
  });

  it('Should resend email confirmation', async () => {
    await server.post('/user?callbackUrl=http://localhost:3000').send(dataUser).expect(201);
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

    const { body } = await server
      .post(`/user?callbackUrl=${callbackUrl}`)
      .send(dataUser)
      .expect(201);

    const token = crypto.encrypt(`${dataUser.email}--${callbackUrl}--${body.id}`);

    const response = await server.get(`/user/activate?token=${token}`);
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe(callbackUrl);
  });
  it('Should update user on first update when redirected from email', async () => {
    try {
      const callbackUrl = 'http://localhost:4000';
      const crypto = makeCryptographyUserAdapter();

      const { body } = await server
        .post(`/user?callbackUrl=${callbackUrl}`)
        .send(dataUser)
        .expect(201);

      const token = crypto.encrypt(`${dataUser.email}--${callbackUrl}--${body.id}`);

      await server.get(`/user/activate?token=${token}`);
      await server
        .put(`/user`)
        .send({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '@Password123',
          confirmPassword: '@Password123',
        })
        .expect(204);
    } catch (error) {}
  });

  it('Should return list of education levels', async () => {
    const response = await server.get('/user/education-levels').expect(200);
    response.body.forEach(element => {
      expect(element).toHaveProperty('id');
      expect(element).toHaveProperty('name');
    });
  });

  it('Should return list of interests courses', async () => {
    const response = await server.get('/user/interest-courses').expect(200);
    response.body.forEach(element => {
      expect(element).toHaveProperty('id');
      expect(element).toHaveProperty('name');
    });
  });

  it('Should return list of interests courses', async () => {
    const response = await server.get('/user/interest-universities').expect(200);
    response.body.forEach(element => {
      expect(element).toHaveProperty('id');
      expect(element).toHaveProperty('name');
    });
  });
});
