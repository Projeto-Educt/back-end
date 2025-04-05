import { ListInterestUniversitiesController } from '@/modules/user/application/controllers';
import { makeListInterestUniversitiesUsecase } from '@/modules/user/factories/application/usecases';

export const makeListInterestUniversitiesController = async () => {
  const usecase = await makeListInterestUniversitiesUsecase();
  return new ListInterestUniversitiesController(usecase);
};
