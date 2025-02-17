import { deepFreeze } from '@/main/helpers';

const sut = <T>(obj: T): T => deepFreeze(obj);

describe('deepFreeze()', () => {
  it('Should return non-object types as is', () => {
    expect(sut(42)).toBe(42);
    expect(sut('string')).toBe('string');
    expect(sut(true)).toBe(true);
    expect(sut(null)).toBe(null);
  });

  it('Should freeze a simple object', () => {
    const obj = { a: 1, b: 2 };

    const frozenObj = sut(obj);

    expect(Object.isFrozen(frozenObj)).toBe(true);
    expect(() => {
      (frozenObj as any).a = 10;
    }).toThrow(TypeError);
  });

  it('Should freeze nested objects', () => {
    const obj = { a: { b: { c: 3 } } };

    const frozenObj = sut(obj);

    expect(Object.isFrozen(frozenObj)).toBe(true);
    expect(Object.isFrozen(frozenObj.a)).toBe(true);
    expect(Object.isFrozen(frozenObj.a.b)).toBe(true);
    expect(() => {
      (frozenObj.a as any).b = 10;
    }).toThrow(TypeError);
    expect(() => {
      (frozenObj.a.b as any).c = 10;
    }).toThrow(TypeError);
  });

  it('Should handle arrays and freeze them', () => {
    const arr = [1, 2, { a: 3 }];

    const frozenArr = sut(arr);

    expect(Object.isFrozen(frozenArr)).toBe(true);
    expect(Object.isFrozen(frozenArr[2])).toBe(true);
    expect(() => {
      (frozenArr as any)[0] = 10;
    }).toThrow(TypeError);
    expect(() => {
      (frozenArr[2] as any).a = 10;
    }).toThrow(TypeError);
  });

  it('should not freeze already frozen objects', () => {
    const obj = Object.freeze({ a: 1 });

    const frozenObj = sut(obj);

    expect(frozenObj).toBe(obj);
    expect(Object.isFrozen(frozenObj)).toBe(true);
  });

  it('Should return Buffer objects as is without freezing them', () => {
    const buffer = Buffer.from('hello');

    const result = sut(buffer);

    expect(result).toBe(buffer);
    expect(Object.isFrozen(result)).toBe(false);
  });
});
