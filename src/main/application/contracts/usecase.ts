export interface UseCase<in I, out R> {
  execute: (input: I) => Promise<R>;
}
