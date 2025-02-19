import type { HandlerContract } from '@/main/events';
import { type DispatcherContract } from '@/main/events';
import { makeDispatcher } from '@/main/factories/events/make-dispacher.factory';
import { RegisteredStudentEvent } from '@/modules/student/events';
import { SendEmailRegisteredStudentHandler } from '@/modules/student/events/z-handlers';

type RegisteredStudentEventOutput = {
  dispatcher: DispatcherContract;
  event: RegisteredStudentEvent;
};

export const makeRegisteredStudentEvent = (): RegisteredStudentEventOutput => {
  const dispatcher = makeDispatcher();
  const event = new RegisteredStudentEvent();
  const handlers = [new SendEmailRegisteredStudentHandler()] as unknown as HandlerContract[];
  for (const handler of handlers) {
    dispatcher.register(event.getName(), handler);
  }

  return {
    dispatcher,
    event,
  };
};
