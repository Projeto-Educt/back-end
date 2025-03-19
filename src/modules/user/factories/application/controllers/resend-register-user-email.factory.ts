import { makeValidatorFactory } from '@/main/factories/infra/make-validator.factory';
import { ResendRegisterUserEmailController } from '@/modules/user/application/controllers';
import { makeResendRegisterUserEmailUseCase } from '@/modules/user/factories/application/usecases';
import { resendRegisterUserEmailSchema } from '@/modules/user/infra';

export const makeResendRegisterUserEmailController = async () => {
  const validator = makeValidatorFactory(resendRegisterUserEmailSchema);
  const usecase = await makeResendRegisterUserEmailUseCase();
  return new ResendRegisterUserEmailController(validator, usecase);
};
