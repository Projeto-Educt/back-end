import { EventBase } from '@/main/events';

type RegisteredUserEventPayload = {
  name: string;
  email: string;
  callbackUrl: string;
};

export class RegisteredUserEvent extends EventBase<RegisteredUserEventPayload> {
  constructor() {
    super('registered-user');
  }
}
