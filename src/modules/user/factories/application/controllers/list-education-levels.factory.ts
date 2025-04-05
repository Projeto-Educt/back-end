import { ListEducationLevelsController } from '@/modules/user/application/controllers';
import { makeListEducationLevelsUsecase } from '@/modules/user/factories/application/usecases';

export const makeListEducationLevelsController = async () => {
  const usecase = await makeListEducationLevelsUsecase();
  return new ListEducationLevelsController(usecase);
};
