import type { Either } from '@/main/errors';
import { CustomError } from '@/main/errors';
import { UniqueEntityId } from './value-objects/unique-entity-id';

export abstract class Entity<T> {
  private static _messagesError: string[] = [];
  private readonly _props: T;
  readonly id: UniqueEntityId;

  protected constructor(props: T, id?: UniqueEntityId) {
    this.id = id ?? UniqueEntityId.create();
    this._props = props;
  }

  static get error(): CustomError | null {
    if (this._messagesError.length) {
      return new CustomError([...new Set(this._messagesError)]);
    }

    return null;
  }

  static throwErrorsIfExists(): void {
    const error = this.error;
    if (error) throw error;
  }

  static verifyCustomErrors(values: Array<Either<CustomError, any>>): void {
    const errors: CustomError[] = values.filter(value => value.isLeft()).map(value => value.value);

    if (errors.length) {
      this.addError(errors);
    }
  }

  protected get props(): T {
    return this._props;
  }

  protected static addError(error: CustomError[] | CustomError): void {
    Array.isArray(error)
      ? this._messagesError.push(...error.flatMap(e => e.messages))
      : this._messagesError.push(...error.messages);
  }

  protected static clearErrors(): void {
    this._messagesError = [];
  }

  toJSON(): Required<{ id: string } & T> {
    return {
      id: this.id.value,
      ...this.props,
    } as unknown as Required<{ id: string } & T>;
  }
}
