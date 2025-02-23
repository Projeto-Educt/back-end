/*
 * @jest-environment ./src/main/config/jest.environment.ts
 */

import { ClientDb } from '@/main/helpers/client-db--helper';
import type { PrismaClient } from '@prisma/client';
import type { StudentRepositoryContract } from '../../contracts';
import { StudentEntity } from '../../domain/student.entity';
import { makeStudentRepository } from '../../factories';

describe('StudentRepository', () => {
  let clientDb: PrismaClient;
  let repository: StudentRepositoryContract;

  beforeAll(async () => {
    clientDb = await ClientDb.getClient();
    repository = await makeStudentRepository();
  });

  beforeEach(async () => {
    await clientDb.student.deleteMany();
  });

  afterAll(async () => {
    await ClientDb.disconnect();
  });

  it('Should return null if student not found', async () => {
    const student = await repository.findOneOrNull({
      field: 'email',
      values: 'johndoe@example.com',
    });

    expect(student).toBeNull();
  });

  it('Should return a student found', async () => {
    await clientDb.student.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '@Password123',
      },
    });

    const student = await repository.findOneOrNull({
      field: 'email',
      values: 'johndoe@example.com',
    });

    expect(student).toBeInstanceOf(StudentEntity);
  });

  it('Should create a student', async () => {
    const student = StudentEntity.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
    });

    await repository.create(student);

    const createdStudent = await clientDb.student.findFirst({
      where: {
        email: 'johndoe@example.com',
      },
    });

    expect(createdStudent).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
    });
  });
});
