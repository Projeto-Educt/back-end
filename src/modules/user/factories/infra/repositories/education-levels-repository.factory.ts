import { ClientDb } from '@/main/helpers/client-db-helper';
import type { EducationLevelRepositoryContract } from '@/modules/user/contracts';
import { EducationLevelRepositoryInfra } from '@/modules/user/infra/repository/education-level-repository.infra';

export const makeEducationLevelRepository = async (): Promise<EducationLevelRepositoryContract> => {
  const clientDb = await ClientDb.getClient();
  return new EducationLevelRepositoryInfra(clientDb);
};
