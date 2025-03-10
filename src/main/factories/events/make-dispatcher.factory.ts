import type { DispatcherContract } from '@/main/events';
import { EventDispatcher } from '@/main/events';

export const makeDispatcher = (): DispatcherContract => {
  return new EventDispatcher();
};
