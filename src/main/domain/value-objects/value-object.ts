import { CustomError } from '@/main/errors';
import { deepFreeze } from '@/main/helpers';

type Props = Record<string, any> | string | number;

export abstract class ValueObject<T extends Props> {
  private readonly _value: T;
  private static _messagesError: string[] = [];

  protected constructor(props: T) {
    this._value = deepFreeze(props);
  }

  get value(): T {
    return this._value;
  }

  static get error(): CustomError | null {
    if (this._messagesError.length) {
      return new CustomError(this._messagesError);
    }

    return null;
  }

  protected static addError(error: CustomError[] | CustomError): void {
    Array.isArray(error)
      ? this._messagesError.push(...error.flatMap(e => e.messages))
      : this._messagesError.push(...error.messages);
  }

  protected static clearErrors(): void {
    this._messagesError = [];
  }
}
