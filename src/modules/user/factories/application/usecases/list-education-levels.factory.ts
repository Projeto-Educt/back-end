import { ListEducationLevelsUsecase } from '@/modules/user/application/usecases';
import { makeEducationLevelRepository } from '@/modules/user/factories/infra';

export const makeListEducationLevelsUsecase = async () => {
  const repository = await makeEducationLevelRepository();
  return new ListEducationLevelsUsecase(repository);
};
