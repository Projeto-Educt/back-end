import type { Entity } from '@/main/domain';

export type FindFieldsProps = {
  field: string;
  values: string | number | boolean;
};

export interface CreateRepoContract<E extends Entity> {
  create(entity: E): Promise<void>;
}

export interface FindOneRepoContract<E extends Entity> {
  findOne(props: FindFieldsProps): Promise<E>;
}

export interface FindOneOrNullRepoContract<E extends Entity> {
  findOneOrNull(props: FindFieldsProps): Promise<E | null>;
}

export interface FindAllRepoContract<E extends Entity> {
  findAll(props?: FindFieldsProps): Promise<E[]>;
}

export interface MemoryRepositoryContract<E extends Entity>
  extends CreateRepoContract<E>,
    FindOneRepoContract<E>,
    FindOneOrNullRepoContract<E>,
    FindAllRepoContract<E> {}
