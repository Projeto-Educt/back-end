import { makeParamsHelper } from '@/main/factories/application/params.factory';

describe('TokenService', () => {
  const tokenService = makeParamsHelper();

  it('Should create a token', () => {
    const obj = { name: 'John Doe', age: 30 };
    const token = tokenService.createString(obj);
    expect(token).toBe('name=John Doe&age=30');
  });

  it('Should create an object from a token', () => {
    const token = 'name=John Doe&age=30';
    const obj = tokenService.createObj(token);
    expect(obj).toEqual({ name: 'John Doe', age: '30' });
  });
});
