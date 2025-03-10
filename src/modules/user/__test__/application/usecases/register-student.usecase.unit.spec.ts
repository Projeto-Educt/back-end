import { CustomError } from '@/main/errors';
import type { DispatcherContract } from '@/main/events';
import { CustomHttpException } from '@/main/helpers';
import { RepositoryInMemory } from '@/main/infra/repositories/repository-in-memory.infra';
import { RegisterUserUseCase } from '@/modules/user/application/usecases/register-user.usecase';
import { UserEntity } from '@/modules/user/domain/user.entity';
import type { RegisteredUserEvent } from '@/modules/user/events';

class UserRepoMemory extends RepositoryInMemory<UserEntity> {}

describe('RegisterUserUseCase', () => {
  let userRepository: UserRepoMemory;
  let sut: RegisterUserUseCase;
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
    sut = new RegisterUserUseCase(
      userRepository,
      event as RegisteredUserEvent,
      dispatcher as DispatcherContract,
    );
  });

  it('Should throw domain errors if received invalid data', async () => {
    try {
      await sut.execute({
        name: '',
        email: '',
        password: '',
        callbackUrl: '',
      });
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.messages).toEqual([
        'Por favor, insira um e-mail válido (ex: usuario@dominio.com).',
        'Por favor, insira uma senha forte.',
        'A senha deve ter o mínimo de 6 caracteres e conter letras maiúsculas e minúsculas, números e símbolos como ! @ # $ % & * =',
        'Por favor, insira seu nome completo.',
        'O nome deve conter apenas letras, espaços e hifens.',
      ]);
    }
  });

  it('Should throw error if email already exists', async () => {
    const entity = UserEntity.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
    });

    await userRepository.create(entity);

    try {
      await sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '@Password123',
        callbackUrl: '',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomHttpException);
      expect((error as CustomHttpException).message).toEqual(['E-mail já cadastrado']);
    }
  });

  it('Should register a user', async () => {
    const entity = UserEntity.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
    });

    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
      callbackUrl: '',
    });

    const user = await userRepository.findOne({
      field: 'email',
      values: entity.email,
    });

    expect(user).toBeInstanceOf(UserEntity);
  });

  it('Should set payload call with correct data', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
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
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
      callbackUrl: '',
    });

    expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
    expect(dispatcher.dispatch).toHaveBeenCalledWith(event);
  });
});
