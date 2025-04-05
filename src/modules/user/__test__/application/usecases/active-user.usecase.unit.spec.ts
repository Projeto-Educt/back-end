import { CustomError } from '@/main/errors';
import { RepositoryInMemory } from '@/main/infra';
import { ActiveUserUseCase } from '@/modules/user/application/usecases';
import { UserEntity } from '@/modules/user/domain/user.entity';

class UserRepoMemory extends RepositoryInMemory<UserEntity> {}

describe('ResendRegisterUserEmailUseCase', () => {
  let userRepository: UserRepoMemory;
  let sut: ActiveUserUseCase;

  beforeEach(() => {
    userRepository = new UserRepoMemory();
    sut = new ActiveUserUseCase(userRepository);

    const user = UserEntity.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
    });

    userRepository.create(user);
  });

  it('Should throw if user not found', async () => {
    try {
      await sut.execute({
        email: 'invalid-email',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).messages).toEqual(['email: invalid-email, not found']);
    }
  });

  it('Should active user', async () => {
    await sut.execute({
      email: 'johndoe@example.com',
    });

    const user = await userRepository.findOne({ field: 'email', value: 'johndoe@example.com' });

    expect(user.isActive).toBe(true);
  });
});
