import { ClientDb } from '@/main/helpers/client-db-helper';
import type { UserRepositoryContract } from '@/modules/user/contracts';
import { UserRepositoryInfra } from '@/modules/user/infra/repository/user-repository.infra';

export const makeUserRepository = async (): Promise<UserRepositoryContract> => {
  const clientDb = await ClientDb.getClient();
  return new UserRepositoryInfra(clientDb);
};
