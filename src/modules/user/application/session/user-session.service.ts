import type { Request } from 'express';

type UserSessionType = {
  id: string;
  email?: string;
  firstUpdateExp?: string;
};

export class UserSessionService {
  constructor(private readonly request: Request) {}

  get user(): UserSessionType {
    return this.request.session.user as UserSessionType;
  }

  set user(user: UserSessionType) {
    this.request.session.user = user;
  }
}
