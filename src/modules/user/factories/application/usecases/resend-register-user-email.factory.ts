import { ResendEmailRegisterUserUseCase } from '@/modules/user/application/usecases';
import { makeRegisteredUserEvent } from '@/modules/user/factories/events/make-registered-user.factory';
import { makeUserRepository } from '@/modules/user/factories/infra';

export const makeResendRegisterUserEmailUseCase = async () => {
  const userRepository = await makeUserRepository();
  const { dispatcher, event } = makeRegisteredUserEvent();
  return new ResendEmailRegisterUserUseCase(userRepository, event, dispatcher);
};
