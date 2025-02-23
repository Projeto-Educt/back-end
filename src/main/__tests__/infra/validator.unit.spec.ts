import { CustomHttpException } from '@/main/helpers';
import { ZodValidatorAdapter } from '@/main/infra/validator.infra';
import { z } from 'zod';

describe('Validador', () => {
  it('should return validated data when input is valid', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });
    const validator = new ZodValidatorAdapter(schema);
    const data = { name: 'John Doe', age: 30 };
    const validatedData = validator.validate(data);
    expect(validatedData).toEqual(data);
  });

  it('should return null when input is invalid', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });
    const validator = new ZodValidatorAdapter(schema);
    const data = { name: 'John Doe', age: '30' };
    try {
      validator.validate(data);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomHttpException);
      expect((error as CustomHttpException).message).toEqual(['Expected number, received string']);
    }
  });

  it('should throw any error if not is ZodError', () => {
    const schema = z.object({
      name: z.string(),
    });
    const parseSpy = jest.spyOn(schema, 'parse');
    parseSpy.mockImplementationOnce(() => {
      throw new Error('Erro desconhecido');
    });
    const validator = new ZodValidatorAdapter(schema);

    try {
      validator.validate({ name: 'John Doe' });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toEqual('Erro desconhecido');
    }
  });
});
