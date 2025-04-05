import { UserSessionService } from '@/modules/user/application/session';
import type { Request } from 'express';

export const makeUserSessionFactory = (req: Request) => {
  return new UserSessionService(req);
};
