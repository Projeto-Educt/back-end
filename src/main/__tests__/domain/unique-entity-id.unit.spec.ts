import { UniqueEntityId } from '@/main/domain';
import { CustomError } from '@/main/errors';
import { validate } from 'uuid';

const sut = (id?: string): UniqueEntityId => UniqueEntityId.create(id);

describe('UniqueEntityId', () => {
  it('Should return UniqueEntityId if ID is uuid', () => {
    const id = '123e4567-e89b-12d3-a456-426614174000';
    const uniqueEntityId = sut(id);

    expect(uniqueEntityId).toBeInstanceOf(UniqueEntityId);
  });

  it('Should throw if ID is not uuid', async () => {
    try {
      const id = 'invalid-uuid';
      sut(id);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.messages).toEqual([`Invalid UUID: 'invalid-uuid'`]);
    }
  });

  it('Should be created uuid if not received ID', () => {
    const uniqueEntityId = sut();

    expect(uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(validate(uniqueEntityId.value)).toBe(true);
  });
});
