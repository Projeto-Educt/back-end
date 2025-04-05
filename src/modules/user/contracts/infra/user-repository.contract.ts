import type {
  CreateRepoContract,
  FindOneOrNullRepoContract,
  FindOneRepoContract,
  UpdateRepoContract,
} from '@/main/infra/contracts';
import type { UserEntity } from '../../domain/user.entity';

type E = UserEntity;

export interface RegisterUserRepoContract
  extends FindOneOrNullRepoContract<E>,
    CreateRepoContract<E> {}

export interface ResendEmailRegisterUserRepoContract extends FindOneRepoContract<E> {}

export interface ActiveUserRepoContract extends FindOneRepoContract<E>, UpdateRepoContract<E> {}

export interface UpdateUserRepoContract extends FindOneRepoContract<E>, UpdateRepoContract<E> {}

export interface UserRepositoryContract
  extends RegisterUserRepoContract,
    ResendEmailRegisterUserRepoContract,
    ActiveUserRepoContract,
    UpdateUserRepoContract {}
