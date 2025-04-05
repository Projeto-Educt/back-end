import type { ClientDb } from '@/main/helpers/client-db-helper';
import type { EducationLevelRepositoryContract } from '@/modules/user/contracts';
import { EducationLevelEntity } from '@/modules/user/contracts';

export class EducationLevelRepositoryInfra implements EducationLevelRepositoryContract {
  constructor(private readonly clientDb: ClientDb) {}
  async findAll(): Promise<EducationLevelEntity[]> {
    const educationLevels = await this.clientDb.educationLevel.findMany();

    return educationLevels.map(educationLevel => new EducationLevelEntity(educationLevel));
  }
}
