import type { UseCase } from '@/main/application/contracts/usecase';
import type { ListInterestUniversitiesRepositoryContract } from '@/modules/user/contracts/infra/interest-universities-repository.contracts';

type Input = void;
type Output = {
  id: string;
  name: string;
}[];

export class ListInterestUniversitiesUsecase implements UseCase<Input, Output> {
  constructor(private readonly repository: ListInterestUniversitiesRepositoryContract) {}

  async execute(): Promise<Output> {
    const list = await this.repository.findAll();

    return list.map(item => ({ id: item.id, name: item.name }));
  }
}
