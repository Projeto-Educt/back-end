import type { UseCase } from '@/main/application/contracts/usecase';
import type { ListEducationsRepositoryContract } from '../../contracts/infra/education-level-repository.contracts';

type Input = void;
type Output = {
  id: string;
  name: string;
}[];

export class ListEducationLevelsUsecase implements UseCase<Input, Output> {
  constructor(private readonly repository: ListEducationsRepositoryContract) {}

  async execute(): Promise<Output> {
    const list = await this.repository.findAll();

    return list.map(item => ({ id: item.id, name: item.name }));
  }
}
