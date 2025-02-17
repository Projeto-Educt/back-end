import { CustomError } from '@/main/errors';
import { deepFreeze } from '@/main/helpers';

type Props = Record<string, any> | string | number | boolean;

export abstract class ValueObject<T extends Props = string> {
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
      return new CustomError([...new Set(this._messagesError)]);
    }

    return null;
  }

  protected static addMessageError(messages: string[] | string): void {
    Array.isArray(messages)
      ? this._messagesError.push(...messages.flatMap(message => message))
      : this._messagesError.push(messages);
  }

  protected static clearErrors(): void {
    this._messagesError = [];
  }
}
