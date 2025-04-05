import { ListInterestCourseController } from '@/modules/user/application/controllers';
import { makeListInterestCourseUsecase } from '@/modules/user/factories/application/usecases';

export const makeListInterestCourseController = async () => {
  const usecase = await makeListInterestCourseUsecase();
  return new ListInterestCourseController(usecase);
};
