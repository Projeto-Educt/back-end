import type { UserSessionService } from '@/modules/user/application/session';
import { makeUserSessionFactory } from '@/modules/user/factories';
import type { Request } from 'express';

describe('UserSession', () => {
  let session: UserSessionService;

  beforeEach(() => {
    session = makeUserSessionFactory({ session: {} } as Request);
  });
  it('should create a user session', () => {
    const user = {
      id: '1',
    };

    session.user = user;

    expect(session.user).toEqual(user);
  });
});
