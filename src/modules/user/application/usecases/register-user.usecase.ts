import type { UseCase } from '@/main/application/contracts/usecase';
import { CustomError } from '@/main/errors';
import type { DispatcherContract } from '@/main/events';
import { conflict } from '@/main/helpers';
import type { UserRepositoryContract } from '@/modules/user/contracts';
import { UserEntity, type CreateUserProps } from '@/modules/user/domain/user.entity';
import type { RegisteredUserEvent } from '@/modules/user/events';

type RegisterUserInput = CreateUserProps & {
  callbackUrl: string;
};

type RegisterUserOutput = void;

export class RegisterUserUseCase implements UseCase<RegisterUserInput, RegisterUserOutput> {
  constructor(
    private userRepository: UserRepositoryContract,
    private event: RegisteredUserEvent,
    private dispatcher: DispatcherContract,
  ) {}
  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const user = UserEntity.create(input);

    const userExists = await this.userRepository.findOneOrNull({
      field: 'email',
      values: user.email,
    });

    if (userExists) {
      throw conflict(new CustomError('E-mail já cadastrado'));
    }

    await this.userRepository.create(user);

    this.event.setPayload({
      name: user.name,
      email: user.email,
      callbackUrl: input.callbackUrl,
    });
    this.dispatcher.dispatch(this.event);
    return;
  }
}
