import type { ClientDb } from '@/main/helpers/client-db-helper';
import type {
  InterestUniversitiesEntity,
  InterestUniversitiesRepositoryContract,
} from '@/modules/user/contracts';
import { InterestCourseEntity } from '@/modules/user/contracts';

export class InterestUniversitiesRepositoryInfra implements InterestUniversitiesRepositoryContract {
  constructor(private readonly clientDb: ClientDb) {}
  async findAll(): Promise<InterestUniversitiesEntity[]> {
    const interestUniversities = await this.clientDb.interestUniversity.findMany();

    return interestUniversities.map(university => new InterestCourseEntity(university));
  }
}
