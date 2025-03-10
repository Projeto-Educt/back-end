import { makeValidatorFactory } from '@/main/factories/infra/make-validator.factory';
import { RegisterUserController } from '@/modules/user/application/controllers';
import { makeRegisterUserUseCase } from '@/modules/user/factories/application/usecases';
import { registerUserSchema } from '@/modules/user/infra';

export const makeRegisterUserController = async () => {
  const validator = makeValidatorFactory(registerUserSchema);
  const usecase = await makeRegisterUserUseCase();
  return new RegisterUserController(validator, usecase);
};
