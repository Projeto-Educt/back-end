import type { HandlerContract } from '@/main/events';
import { type DispatcherContract } from '@/main/events';
import { makeDispatcher } from '@/main/factories/events/make-dispatcher.factory';
import { RegisteredUserEvent } from '../../events';
import { SendEmailRegisteredUserHandler } from '../../events/handlers';

type RegisteredUserEventOutput = {
  dispatcher: DispatcherContract;
  event: RegisteredUserEvent;
};

export const makeRegisteredUserEvent = (): RegisteredUserEventOutput => {
  const dispatcher = makeDispatcher();
  const event = new RegisteredUserEvent();
  const handlers = [new SendEmailRegisteredUserHandler()] as unknown as HandlerContract[];
  for (const handler of handlers) {
    dispatcher.register(event.getName(), handler);
  }

  return {
    dispatcher,
    event,
  };
};
