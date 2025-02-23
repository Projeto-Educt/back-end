import { Entity } from '@/main/domain';
import { CustomError } from '@/main/errors';
import { RepositoryInMemory } from '@/main/infra/repositories/repository-in-memory.infra';

type Props = {
  name: string;
  email: string;
  age: number;
};

class EntityTester extends Entity<Props> {
  name: string = this.props.name;
  email: string = this.props.email;
  age: number = this.props.age;

  protected constructor(props: Props) {
    super(props);
  }

  static create(props: Props): EntityTester {
    return new EntityTester(props);
  }
}

class RepositoryInMemoryTester extends RepositoryInMemory<EntityTester> {}

describe('RepositoryInMemory', () => {
  let repository: RepositoryInMemoryTester;

  beforeEach(() => {
    repository = new RepositoryInMemoryTester();
  });

  it('should be able to create an entity', async () => {
    const entity = EntityTester.create({ name: 'John Doe', email: 'any_mail@mail.com', age: 30 });
    await repository.create(entity);
    const result = repository.data;
    expect(result).toEqual([entity]);
  });

  it('should be able to find or return null', async () => {
    const result = await repository.findOneOrNull({ field: 'name', values: 'John Doe' });
    expect(result).toBeNull();
  });

  describe('FindOne', () => {
    const entity = EntityTester.create({ name: 'John Doe', email: 'any_mail@mail.com', age: 30 });
    beforeEach(async () => {
      await repository.create(entity);
    });

    it('should be able to find an entity', async () => {
      const result = await repository.findOne({ field: 'name', values: 'John Doe' });
      expect(result).toEqual(entity);
    });

    it('Should throw an error if entity not found', async () => {
      const props = { field: 'name', values: 'John Doe2' };
      try {
        await repository.findOne(props);
      } catch (error) {
        expect(error).toBeInstanceOf(CustomError);

        expect((error as CustomError).messages).toEqual([
          `${props.field}: ${props.values}, not found`,
        ]);
      }
    });
  });

  describe('FindAll', () => {
    const entities = [
      EntityTester.create({ name: 'John Doe', email: 'any_mail@mail.com', age: 30 }),
      EntityTester.create({ name: 'John Doe', email: 'any_mail2@mail.com', age: 31 }),
      EntityTester.create({ name: 'Mary Doe', email: 'any_mail3@mail.com', age: 30 }),
    ];
    beforeEach(async () => {
      for (const entity of entities) {
        await repository.create(entity);
      }
    });

    it('should be able to find all entities', async () => {
      const result = await repository.findAll();
      expect(result).toEqual(entities);
    });

    it('Should return all results by fields received', async () => {
      const result = await repository.findAll({ field: 'name', values: 'John Doe' });
      expect(result).toEqual(entities.filter(entity => entity.name === 'John Doe'));
    });
  });
});
