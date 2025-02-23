import { makeValidatorFactory } from '@/main/factories/infra/make-validator.factory';
import { RegisterStudentController } from '@/modules/student/application/controllers';
import { registerStudentSchema } from '@/modules/student/infra';
import { makeRegisterStudentUseCase } from '../usecases';

export const makeRegisterStudentController = async () => {
  const validator = makeValidatorFactory(registerStudentSchema);
  const usecase = await makeRegisterStudentUseCase();
  return new RegisterStudentController(validator, usecase);
};
