import type { Entity } from '@/main/domain';
import { CustomError } from '@/main/errors';
import type { FindFieldsProps, MemoryRepositoryContract } from '@/main/infra/contracts';

export abstract class RepositoryInMemory<E extends Entity> implements MemoryRepositoryContract<E> {
  data: E[] = [];
  constructor() {}

  create(entity: E): Promise<void> {
    this.data.push(entity);
    return Promise.resolve();
  }

  findOne({ field, value }: FindFieldsProps<E>): Promise<E> {
    const entity = this.data.find(entity => {
      if (field === 'id') {
        return entity.id === value;
      }

      return entity[field] === value;
    });

    if (!entity) {
      throw new CustomError(`${field.toString()}: ${value}, not found`);
    }
    return Promise.resolve(entity);
  }

  findOneOrNull({ field, value }: FindFieldsProps<E>): Promise<E | null> {
    const entity = this.data.find(entity => entity[field] === value);
    return Promise.resolve(entity || null);
  }

  findAll(props?: FindFieldsProps<E>): Promise<E[]> {
    if (props) {
      const { field, value } = props;
      return Promise.resolve(this.data.filter(entity => entity[field] === value));
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
