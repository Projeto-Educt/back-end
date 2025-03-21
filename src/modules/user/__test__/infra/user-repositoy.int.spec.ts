/*
 * @jest-environment ./src/main/config/jest.environment.ts
 */

import { CustomHttpException } from '@/main/helpers';
import { ClientDb } from '@/main/helpers/client-db-helper';
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
        isActive: true,
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

    const createdUser = await clientDb.user.findFirst({
      where: {
        id: user.id.value,
      },
    });

    expect(createdUser).toEqual({
      id: user.id.value,
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
      educationLevelId: null,
      interestCourseId: null,
      interestUniversityId: null,
      isActive: false,
      profile: null,
    });
  });

  it('Should throw error if user not found in FindOne', async () => {
    try {
      await repository.findOne({
        field: 'email',
        values: 'johndoe@example.com',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomHttpException);
      expect(error as CustomHttpException).toEqual({
        statusCode: 404,
        message: ['Usuário não encontrado.'],
        error: 'Not Found',
      });
    }
  });

  it('Should update a user', async () => {
    const user = UserEntity.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
    });

    await repository.create(user);

    const updatedUser = UserEntity.create({
      id: user.id.value,
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
      isActive: true,
    });

    await repository.update(updatedUser);

    const userUpdated = await clientDb.user.findFirst({
      where: {
        email: 'johndoe@example.com',
      },
    });

    expect(userUpdated).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
      educationLevelId: null,
      interestCourseId: null,
      interestUniversityId: null,
      isActive: true,
      profile: null,
    });
  });
});
