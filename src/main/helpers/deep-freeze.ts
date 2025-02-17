export const deepFreeze = <T>(obj: T): T => {
  if (!obj || typeof obj !== 'object' || Object.isFrozen(obj)) {
    return obj;
  }

  if (obj.constructor === Buffer) {
    return obj;
  }

  const propNames = Object.getOwnPropertyNames(obj) as Array<keyof T>;

  for (const name of propNames) {
    const value = obj[name];
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return Object.freeze(obj);
};
