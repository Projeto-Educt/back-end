import type { Entity } from '@/main/domain';

type EntityValueTypes<E extends Entity> = {
  [K in keyof E]: E[K];
};

export type FindFieldsProps<E extends Entity> = {
  [K in keyof EntityValueTypes<E>]: {
    field: K;
    value: EntityValueTypes<E>[K];
  };
}[keyof EntityValueTypes<E>];

export interface CreateRepoContract<E extends Entity> {
  create(entity: E): Promise<void>;
}

export interface FindOneRepoContract<E extends Entity> {
  findOne(props: FindFieldsProps<E>): Promise<E>;
}

export interface FindOneOrNullRepoContract<E extends Entity> {
  findOneOrNull(props: FindFieldsProps<E>): Promise<E | null>;
}

export interface FindAllRepoContract<E extends Entity> {
  findAll(props?: FindFieldsProps<E>): Promise<E[]>;
}

export interface UpdateRepoContract<E extends Entity> {
  update(entity: E): Promise<void>;
}

export interface MemoryRepositoryContract<E extends Entity>
  extends CreateRepoContract<E>,
    FindOneRepoContract<E>,
    FindOneOrNullRepoContract<E>,
    FindAllRepoContract<E>,
    UpdateRepoContract<E> {}
