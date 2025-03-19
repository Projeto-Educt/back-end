import { CustomError } from '@/main/errors';
import type { DispatcherContract } from '@/main/events';
import { RepositoryInMemory } from '@/main/infra';
import { ResendEmailRegisterUserUseCase } from '@/modules/user/application/usecases/resend-register-user-email.usecase';
import { UserEntity } from '@/modules/user/domain/user.entity';
import type { RegisteredUserEvent } from '@/modules/user/events';

class UserRepoMemory extends RepositoryInMemory<UserEntity> {}

describe('ResendRegisterUserEmailUseCase', () => {
  let userRepository: UserRepoMemory;
  let sut: ResendEmailRegisterUserUseCase;
  let event: jest.Mocked<Partial<RegisteredUserEvent>>;
  let dispatcher: jest.Mocked<Partial<DispatcherContract>>;

  beforeEach(() => {
    userRepository = new UserRepoMemory();
    event = {
      setPayload: jest.fn(),
      getName: jest.fn().mockReturnValue('test'),
    };
    dispatcher = {
      dispatch: jest.fn(),
    };
    sut = new ResendEmailRegisterUserUseCase(
      userRepository,
      event as RegisteredUserEvent,
      dispatcher as DispatcherContract,
    );

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
        callbackUrl: 'http://localhost:3000/confirm',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).messages).toEqual(['email: invalid-email, not found']);
    }
  });

  it('Should set payload call with correct data', async () => {
    await sut.execute({
      email: 'johndoe@example.com',
      callbackUrl: '',
    });

    expect(event.setPayload).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      callbackUrl: '',
    });
  });

  it('Should dispatch event', async () => {
    await sut.execute({
      email: 'johndoe@example.com',
      callbackUrl: '',
    });

    expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
    expect(dispatcher.dispatch).toHaveBeenCalledWith(event);
  });
});
