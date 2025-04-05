/*
 * @jest-environment ./src/main/config/jest.environment.ts
 */

import type { EducationLevelRepositoryContract } from '@/modules/user/contracts';
import { EducationLevelEntity } from '@/modules/user/contracts';
import { makeEducationLevelRepository } from '@/modules/user/factories/infra';

describe('UserRepository', () => {
  let repository: EducationLevelRepositoryContract;
  beforeAll(async () => {
    repository = await makeEducationLevelRepository();
  });

  it('Should return all education levels', async () => {
    const list = await repository.findAll();

    list.forEach(element => {
      expect(element).toBeInstanceOf(EducationLevelEntity);
    });
  });
});
