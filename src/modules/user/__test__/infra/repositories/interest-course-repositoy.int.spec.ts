/*
 * @jest-environment ./src/main/config/jest.environment.ts
 */

import type { InterestCourseRepositoryContract } from '@/modules/user/contracts';
import { InterestCourseEntity } from '@/modules/user/contracts';
import { makeInterestCourseRepository } from '@/modules/user/factories/infra';

describe('InterestRepository', () => {
  let repository: InterestCourseRepositoryContract;
  beforeAll(async () => {
    repository = await makeInterestCourseRepository();
  });

  it('Should return all interests courses', async () => {
    const list = await repository.findAll();

    list.forEach(element => {
      expect(element).toBeInstanceOf(InterestCourseEntity);
    });
  });
});
