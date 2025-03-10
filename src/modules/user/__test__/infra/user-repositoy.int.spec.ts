/*
 * @jest-environment ./src/main/config/jest.environment.ts
 */

import { ClientDb } from '@/main/helpers/client-db--helper';
import type { PrismaClient } from '@prisma/client';
import type { UserRepositoryContract } from '../../contracts';
import { UserEntity } from '../../domain/user.entity';
import { makeUserRepository } from '../../factories';

describe('UserRepository', () => {
  let clientDb: PrismaClient;
  let repository: UserRepositoryContract;

  beforeAll(async () => {
    clientDb = await ClientDb.getClient();
    repository = await makeUserRepository();
  });

  beforeEach(async () => {
    await clientDb.user.deleteMany();
  });

  afterAll(async () => {
    await ClientDb.disconnect();
  });

  it('Should return null if user not found', async () => {
    const user = await repository.findOneOrNull({
      field: 'email',
      values: 'johndoe@example.com',
    });

    expect(user).toBeNull();
  });

  it('Should return a user found', async () => {
    await clientDb.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '@Password123',
      },
    });

    const user = await repository.findOneOrNull({
      field: 'email',
      values: 'johndoe@example.com',
    });

    expect(user).toBeInstanceOf(UserEntity);
  });

  it('Should create a user', async () => {
    const user = UserEntity.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
    });

    await repository.create(user);

    const createduser = await clientDb.user.findFirst({
      where: {
        email: 'johndoe@example.com',
      },
    });

    expect(createduser).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
    });
  });
});
