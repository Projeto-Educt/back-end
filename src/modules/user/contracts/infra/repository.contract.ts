import type {
  CreateRepoContract,
  FindOneOrNullRepoContract,
  FindOneRepoContract,
} from '@/main/infra/contracts/repository.contracts';
import type { UserEntity } from '../../domain/user.entity';

type E = UserEntity;

export interface RegisterUserRepoContract
  extends FindOneOrNullRepoContract<E>,
    CreateRepoContract<E> {}

export interface ResendEmailRegisterUserRepoContract extends FindOneRepoContract<E> {}

export interface UserRepositoryContract
  extends RegisterUserRepoContract,
    ResendEmailRegisterUserRepoContract {}
