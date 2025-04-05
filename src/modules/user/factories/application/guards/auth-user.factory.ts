import { makeParamsHelper } from '@/main/factories/application/params.factory';
import { AuthUserGuard } from '@/modules/user/application/guards/auth-user.guard';
import { makeCryptographyUserAdapter } from '../../adapter/cryptography.factory';
import { makeUserRepository } from '../../infra';

export const makeAuthUser = async () => {
  const crypto = makeCryptographyUserAdapter();
  const token = makeParamsHelper();
  const repository = await makeUserRepository();
  return new AuthUserGuard(crypto, token, repository);
};
