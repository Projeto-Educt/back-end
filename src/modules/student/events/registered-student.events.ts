import { EventBase } from '@/main/events';

type RegisteredStudentEventPayload = {
  name: string;
  email: string;
  callbackUrl: string;
};

export class RegisteredStudentEvent extends EventBase<RegisteredStudentEventPayload> {
  constructor() {
    super('registered-student');
  }
}
