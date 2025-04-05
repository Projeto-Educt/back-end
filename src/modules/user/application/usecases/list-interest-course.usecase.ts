import type { UseCase } from '@/main/application/contracts/usecase';
import type { ListInterestCourseRepositoryContract } from '@/modules/user/contracts/infra/interest-course-repository.contracts';

type Input = void;
type Output = {
  id: string;
  name: string;
}[];

export class ListInterestCourseUsecase implements UseCase<Input, Output> {
  constructor(private readonly repository: ListInterestCourseRepositoryContract) {}

  async execute(): Promise<Output> {
    const list = await this.repository.findAll();

    return list.map(item => ({ id: item.id, name: item.name }));
  }
}
