import { ClientDb } from '@/main/helpers/client-db-helper';
import type { InterestCourseRepositoryContract } from '@/modules/user/contracts';
import { InterestCourseRepositoryInfra } from '@/modules/user/infra/repository/interest-course-repository.infra';

export const makeInterestCourseRepository = async (): Promise<InterestCourseRepositoryContract> => {
  const clientDb = await ClientDb.getClient();
  return new InterestCourseRepositoryInfra(clientDb);
};
