import type { EventContract } from './event.contract';

export interface HandlerContract<E extends EventContract = EventContract> {
  handle: (event: E) => void;
}
