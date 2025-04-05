import type { ClientDb } from '@/main/helpers/client-db-helper';
import type { InterestCourseRepositoryContract } from '@/modules/user/contracts';
import { InterestCourseEntity } from '@/modules/user/contracts';

export class InterestCourseRepositoryInfra implements InterestCourseRepositoryContract {
  constructor(private readonly clientDb: ClientDb) {}
  async findAll(): Promise<InterestCourseEntity[]> {
    const interestCourses = await this.clientDb.interestCourse.findMany();

    return interestCourses.map(course => new InterestCourseEntity(course));
  }
}
