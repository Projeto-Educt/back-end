import type { UseCase } from '@/main/application/contracts/usecase';
import type { UpdateUserRepoContract } from '@/modules/user/contracts';
import { UserEntity, type CreateUserProps } from '@/modules/user/domain/user.entity';

type UpdateUserUseCaseInput = Partial<Omit<CreateUserProps, 'id' | 'password'>> & {
  id: string;
};

type UpdateUserUseCaseOutput = void;

export class UpdateUserUseCase implements UseCase<UpdateUserUseCaseInput, UpdateUserUseCaseOutput> {
  constructor(private readonly userRepository: UpdateUserRepoContract) {}

  async execute(input: UpdateUserUseCaseInput): Promise<UpdateUserUseCaseOutput> {
    const user = await this.userRepository.findOne({ field: 'id', value: input.id });

    const userObj = user.toJSON();

    const updatedUser = UserEntity.create({
      ...userObj,
      name: userObj.name.value,
      ...input,
      password: userObj.password,
    });

    await this.userRepository.update(updatedUser);

    return;
  }
}
