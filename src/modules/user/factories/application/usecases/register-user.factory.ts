import { RegisterUserUseCase } from '@/modules/user/application/usecases/register-user.usecase';
import { makeRegisteredUserEvent } from '@/modules/user/factories/events/make-registered-user.factory';
import { makeUserRepository } from '@/modules/user/factories/infra';

export const makeRegisterUserUseCase = async () => {
  const studentRepository = await makeUserRepository();
  const { dispatcher, event } = makeRegisteredUserEvent();
  return new RegisterUserUseCase(studentRepository, event, dispatcher);
};
