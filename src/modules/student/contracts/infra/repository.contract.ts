import type {
  CreateRepoContract,
  FindOneOrNullRepoContract,
} from '@/main/infra/contracts/repository.contracts';
import type { StudentEntity } from '@/modules/student/domain/student.entity';

type E = StudentEntity;

export interface RegisterStudentRepoContract
  extends FindOneOrNullRepoContract<E>,
    CreateRepoContract<E> {}

export interface StudentRepositoryContract extends RegisterStudentRepoContract {}
