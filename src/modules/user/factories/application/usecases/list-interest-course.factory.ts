import { ListInterestCourseUsecase } from '@/modules/user/application/usecases';
import { makeInterestCourseRepository } from '@/modules/user/factories/infra';

export const makeListInterestCourseUsecase = async () => {
  const repository = await makeInterestCourseRepository();
  return new ListInterestCourseUsecase(repository);
};
