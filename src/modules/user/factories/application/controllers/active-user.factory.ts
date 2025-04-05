import { makeValidatorFactory } from '@/main/factories/infra/make-validator.factory';
import { ActiveUserController } from '@/modules/user/application/controllers';
import { makeCryptographyUserAdapter } from '@/modules/user/factories/adapter/cryptography.factory';
import { makeActiveUserUseCase } from '@/modules/user/factories/application/usecases';
import { activeUserSchema } from '@/modules/user/infra';
import type { Request } from 'express';
import { makeUserSessionFactory } from '../session/user-session.factory';

export const makeActiveUserController = async (req: Request) => {
  const validator = makeValidatorFactory(activeUserSchema);
  const usecase = await makeActiveUserUseCase();
  const cryptography = await makeCryptographyUserAdapter();
  const sessionService = makeUserSessionFactory(req);
  return new ActiveUserController(validator, usecase, cryptography, sessionService);
};
