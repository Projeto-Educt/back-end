import { ListInterestUniversitiesUsecase } from '@/modules/user/application/usecases';
import { makeInterestUniversitiesRepository } from '@/modules/user/factories/infra';

export const makeListInterestUniversitiesUsecase = async () => {
  const repository = await makeInterestUniversitiesRepository();
  return new ListInterestUniversitiesUsecase(repository);
};
