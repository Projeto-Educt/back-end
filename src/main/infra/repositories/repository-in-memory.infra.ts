import type { Entity } from '@/main/domain';
import { CustomError } from '@/main/errors';
import type { FindFieldsProps, MemoryRepositoryContract } from '../contracts';

export abstract class RepositoryInMemory<E extends Entity> implements MemoryRepositoryContract<E> {
  data: E[] = [];
  constructor() {}

  create(entity: E): Promise<void> {
    this.data.push(entity);
    return Promise.resolve();
  }

  findOne({ field, values }: FindFieldsProps): Promise<E> {
    const entity = this.data.find(entity => entity[field] === values);

    if (!entity) {
      throw new CustomError(`${field}: ${values}, not found`);
    }
    return Promise.resolve(entity);
  }

  findOneOrNull({ field, values }: FindFieldsProps): Promise<E | null> {
    const entity = this.data.find(entity => entity[field] === values);
    return Promise.resolve(entity || null);
  }

  findAll(props?: FindFieldsProps): Promise<E[]> {
    if (props) {
      const { field, values } = props;
      return Promise.resolve(this.data.filter(entity => entity[field] === values));
    }
    return Promise.resolve(this.data);
  }

  update(entity: E): Promise<void> {
    const index = this.data.findIndex(item => item.id === entity.id);
    if (index === -1) {
      throw new CustomError(`Entity, not found`);
    }
    this.data[index] = entity;
    return Promise.resolve();
  }
}
