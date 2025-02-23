import type { ValidatorContract } from '@/main/infra/contracts/validator.contract';
import { ZodValidatorAdapter } from '@/main/infra/validator.infra';
import type { ZodSchema } from 'zod';

export const makeValidatorFactory = (schema: ZodSchema): ValidatorContract => {
  return new ZodValidatorAdapter(schema);
};
