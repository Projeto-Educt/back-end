import type { EventContract } from './event.contract';
import type { HandlerContract } from './handlers.contract';

export interface DispatcherContract {
  register<T extends EventContract>(name: string, handler: HandlerContract<T>): void;
  remove<T extends EventContract>(name: string, handler: HandlerContract<T>): void;
  dispatch(event: EventContract): void;
  has<T extends EventContract>(name: string, handler: HandlerContract<T>): boolean;
  clear(): void;
}
