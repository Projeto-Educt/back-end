/*
 * @jest-environment ./src/main/config/jest.environment.ts
 */

import type { InterestUniversitiesRepositoryContract } from '@/modules/user/contracts';
import { InterestUniversitiesEntity } from '@/modules/user/contracts';
import { makeInterestUniversitiesRepository } from '@/modules/user/factories/infra';

describe('InterestRepository', () => {
  let repository: InterestUniversitiesRepositoryContract;
  beforeAll(async () => {
    repository = await makeInterestUniversitiesRepository();
  });

  it('Should return all interests universities', async () => {
    const list = await repository.findAll();

    list.forEach(element => {
      expect(element).toBeInstanceOf(InterestUniversitiesEntity);
    });
  });
});
