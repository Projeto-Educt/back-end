import { makeValidatorFactory } from '@/main/factories/infra/make-validator.factory';
import { UpdateUserController } from '@/modules/user/application/controllers';
import { updateUserSchema } from '@/modules/user/infra';
import { makeUpdateUserUsecase } from '../usecases/update-user.factory';

export const makeUpdateUserController = async () => {
  const validator = makeValidatorFactory(updateUserSchema);
  const usecase = await makeUpdateUserUsecase();
  return new UpdateUserController(validator, usecase);
};
