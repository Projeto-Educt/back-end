import { CustomError } from '@/main/errors';
import { v4 as uuidV4, validate } from 'uuid';
import { ValueObject } from './value-object';

export class UniqueEntityId extends ValueObject<string> {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): UniqueEntityId {
    if (id) {
      if (!validate(id)) {
        throw new CustomError([`Invalid UUID: '${id}'`]);
      }

      return new UniqueEntityId(id);
    }

    return new UniqueEntityId(uuidV4());
  }
}
