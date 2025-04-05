import type { UseCase } from '@/main/application/contracts/usecase';
import type { DispatcherContract } from '@/main/events';
import type { UserRepositoryContract } from '../../contracts';
import type { RegisteredUserEvent } from '../../events';

type ResendEmailRegisterUserUseCaseInput = {
  email: string;
  callbackUrl: string;
};

type ResendEmailRegisterUserUseCaseOutput = void;

export class ResendEmailRegisterUserUseCase
  implements UseCase<ResendEmailRegisterUserUseCaseInput, ResendEmailRegisterUserUseCaseOutput>
{
  constructor(
    private userRepository: UserRepositoryContract,
    private event: RegisteredUserEvent,
    private dispatcher: DispatcherContract,
  ) {}
  async execute(
    input: ResendEmailRegisterUserUseCaseInput,
  ): Promise<ResendEmailRegisterUserUseCaseOutput> {
    const user = await this.userRepository.findOne({
      field: 'email',
      value: input.email,
    });

    this.event.setPayload({
      id: user.id,
      name: user.name,
      email: user.email,
      callbackUrl: input.callbackUrl,
    });
    this.dispatcher.dispatch(this.event);
  }
}
