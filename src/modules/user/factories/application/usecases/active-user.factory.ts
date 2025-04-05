import { ActiveUserUseCase } from '@/modules/user/application/usecases';
import { makeUserRepository } from '@/modules/user/factories/infra';

export const makeActiveUserUseCase = async () => {
  const userRepository = await makeUserRepository();
  return new ActiveUserUseCase(userRepository);
};
