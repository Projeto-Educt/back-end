import { Entity, UniqueEntityId } from '@/main/domain';
import { CustomError } from '@/main/errors';

type Props = {
  name: string;
  age: number;
  email: string;
};

const fakeProps: Props = {
  name: 'John Doe',
  age: 30,
  email: 'any_mail@mail.com',
};

const fakeError = new CustomError(['Name is required']);

const fakeError2 = new CustomError(['Age is required', 'Age must be a number']);

const fakeError3 = new CustomError([
  'Email is required',
  'Email must be a string',
  'Email must be an email',
]);

const makeSut = (props: Props, id?: UniqueEntityId): Entity<Props> => {
  class EntityStub extends Entity<Props> {
    constructor(props: Props) {
      super(props, id);
    }
  }

  return new EntityStub(props);
};

describe('Entity', () => {
  it('Should create an ID if not provided', () => {
    const sut = makeSut(fakeProps);

    expect(sut.id.value).toBeDefined();
  });

  it('Should not create an ID if provided', () => {
    const id = UniqueEntityId.create();

    const sut = makeSut(fakeProps, id);

    expect(sut.id.value).toBe(id.value);
  });

  it('Should not return errors', () => {
    class EntityStub extends Entity<Props> {
      constructor(props: Props, id?: UniqueEntityId) {
        super(props, id);
      }
    }

    expect(EntityStub.error).toBeNull();
  });

  describe('addCustomError()', () => {
    it('Should add an error', () => {
      class EntityStub extends Entity<Props> {
        constructor(props: Props, id?: UniqueEntityId) {
          super(props, id);
        }

        static create(props: Props): EntityStub {
          this.clearErrors();
          EntityStub.addCustomError(fakeError);
          const entity = new EntityStub(props);

          return entity;
        }
      }

      EntityStub.create(fakeProps);

      expect(EntityStub.error).toEqual(fakeError);
    });

    it('Should add more one errors', () => {
      class EntityStub extends Entity<Props> {
        constructor(props: Props, id?: UniqueEntityId) {
          super(props, id);
        }

        static create(props: Props): EntityStub {
          this.clearErrors();
          EntityStub.addCustomError([fakeError, fakeError2, fakeError3]);
          const entity = new EntityStub(props);

          return entity;
        }
      }

      EntityStub.create(fakeProps);

      expect(EntityStub.error).toEqual(
        new CustomError([
          'Name is required',
          'Age is required',
          'Age must be a number',
          'Email is required',
          'Email must be a string',
          'Email must be an email',
        ]),
      );
    });
  });

  describe('clearErrors()', () => {
    it('Should clear errors', () => {
      class EntityStub extends Entity<Props> {
        constructor(props: Props, id?: UniqueEntityId) {
          super(props, id);
        }

        static create(props: Props): EntityStub {
          this.clearErrors();
          EntityStub.addCustomError(fakeError);
          EntityStub.clearErrors();
          const entity = new EntityStub(props);

          return entity;
        }
      }

      EntityStub.create(fakeProps);

      expect(EntityStub.error).toBeNull();
    });
  });

  describe('toJSON()', () => {
    it('Should return JSON', () => {
      const sut = makeSut(fakeProps);

      expect(sut.toJSON()).toEqual({
        id: sut.id.value,
        ...fakeProps,
      });
    });
  });
});
