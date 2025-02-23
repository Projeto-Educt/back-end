import { z, type ZodSchema } from 'zod';
import { CustomError } from '../errors';
import { badRequest } from '../helpers';
import type { ValidatorContract } from './contracts/validator.contract';

export class ZodValidatorAdapter<S> implements ValidatorContract {
  private readonly schema: ZodSchema<S>;

  constructor(schema: ZodSchema<S>) {
    this.schema = schema;
  }

  validate(input: any): S {
    try {
      return this.schema.parse(input);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.errors.map(e => e.message);
        throw badRequest(new CustomError(messages));
      }
      throw error;
    }
  }
}
