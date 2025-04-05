type Obj = Record<string, string | number | boolean>;

export class ParamsHelper {
  createString(obj: Obj) {
    const pairs = Object.entries(obj);
    const pairsToStrFormat = pairs.map(([key, value]) => `${key}=${value}`);
    return pairsToStrFormat.join('&');
  }

  createObj(token: string): Obj {
    const pairs = token.split('&');
    const obj: Obj = {};

    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      obj[key] = value;
    }

    return obj;
  }
}
