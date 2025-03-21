import { makeValidatorFactory } from '@/main/factories/infra/make-validator.factory';
import { ActiveUserController } from '@/modules/user/application/controllers';
import { makeCryptographyUserAdapter } from '@/modules/user/factories/adapter/cryptography.factory';
import { makeActiveUserUseCase } from '@/modules/user/factories/application/usecases';
import { activeUserSchema } from '@/modules/user/infra';

export const makeActiveUserController = async () => {
  const validator = makeValidatorFactory(activeUserSchema);
  const usecase = await makeActiveUserUseCase();
  const cryptography = await makeCryptographyUserAdapter();
  return new ActiveUserController(validator, usecase, cryptography);
};
