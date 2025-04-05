import { UpdateUserUseCase } from '@/modules/user/application/usecases';
import { makeUserRepository } from '../../infra/repositories/user-repository.factory';

export const makeUpdateUserUsecase = async () => {
  const userRepository = await makeUserRepository();
  return new UpdateUserUseCase(userRepository);
};
