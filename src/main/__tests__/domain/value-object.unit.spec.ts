import { ValueObject } from '@/main/domain';
import { CustomError } from '@/main/errors';

type TestProps = {
  propA: number;
  propB: string;
};

const fakeError = 'Name is required';

class TestValueObject extends ValueObject<TestProps> {
  constructor(props: TestProps) {
    super(props);
  }
}

const fakeProps = { propA: 1, propB: 'value' };

describe('ValueObject', () => {
  it('Should create a value object and freeze its properties', () => {
    const valueObject = new TestValueObject(fakeProps);

    expect(valueObject.value).toEqual(fakeProps);
  });

  it('Should prevent modification of value properties', () => {
    const valueObject = new TestValueObject(fakeProps);

    expect(() => {
      (valueObject.value as any).propA = 10;
    }).toThrow(TypeError);
  });

  it('Should add an error', () => {
    class TestValueObject extends ValueObject<TestProps> {
      constructor(props: TestProps) {
        super(props);
      }

      static create(props: TestProps): TestValueObject {
        this.clearErrors();
        this.addMessageError(fakeError);
        return new TestValueObject(props);
      }
    }
    TestValueObject.create(fakeProps);

    expect(TestValueObject.error).toEqual(new CustomError(['Name is required']));
  });

  it('Should clear errors', () => {
    class TestValueObject extends ValueObject<TestProps> {
      constructor(props: TestProps) {
        super(props);
      }

      static create(props: TestProps): TestValueObject {
        this.clearErrors();
        this.addMessageError(fakeError);
        this.clearErrors();
        return new TestValueObject(props);
      }
    }

    TestValueObject.create(fakeProps);

    expect(TestValueObject.error).toBeNull();
  });
});
