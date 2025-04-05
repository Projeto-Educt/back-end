import { ClientDb } from '@/main/helpers/client-db-helper';
import type { InterestUniversitiesRepositoryContract } from '@/modules/user/contracts';
import { InterestUniversitiesRepositoryInfra } from '@/modules/user/infra/repository/interest-universities-repository.infra';

export const makeInterestUniversitiesRepository =
  async (): Promise<InterestUniversitiesRepositoryContract> => {
    const clientDb = await ClientDb.getClient();
    return new InterestUniversitiesRepositoryInfra(clientDb);
  };
