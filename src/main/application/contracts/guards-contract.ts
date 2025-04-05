export interface Guard<in I, out R> {
  execute: (input: I) => Promise<R>;
}
