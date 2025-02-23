import { ClientDb } from '@/main/helpers/client-db--helper';
import type { StudentRepositoryContract } from '@/modules/student/contracts';
import { StudentRepositoryInfra } from '../../infra/repository/student-repository.infra';

export const makeStudentRepository = async (): Promise<StudentRepositoryContract> => {
  const clientDb = await ClientDb.getClient();
  return new StudentRepositoryInfra(clientDb);
};
