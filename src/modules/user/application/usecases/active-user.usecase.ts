import type { UseCase } from '@/main/application/contracts/usecase';
import type { ActiveUserRepoContract } from '@/modules/user/contracts';

type Input = {
  email: string;
};
type Output = void;

export class ActiveUserUseCase implements UseCase<Input, Output> {
  constructor(private readonly userRepository: ActiveUserRepoContract) {}
  async execute(input: Input): Promise<void> {
    const user = await this.userRepository.findOne({ field: 'email', values: input.email });

    user.activate();

    await this.userRepository.update(user);
    return;
  }
}
