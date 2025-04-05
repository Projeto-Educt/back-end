import { makeParamsHelper } from '@/main/factories/application/params.factory';
import { CustomHttpException } from '@/main/helpers';
import type { ParamsHelper } from '@/main/helpers/params.helper';
import { RepositoryInMemory } from '@/main/infra';
import type { CryptographyContract } from '@/main/infra/contracts';
import { AuthUserGuard } from '@/modules/user/application/guards/auth-user.guard';
import type { UserRepositoryContract } from '@/modules/user/contracts';
import { UserEntity } from '@/modules/user/domain/user.entity';
import { makeCryptographyUserAdapter } from '@/modules/user/factories';

class RepoMemory extends RepositoryInMemory<UserEntity> {}

describe('AuthUserGuard', () => {
  let crypto: CryptographyContract;
  let paramsHelper: ParamsHelper;
  let repository: UserRepositoryContract;
  let guard: AuthUserGuard;

  beforeEach(async () => {
    crypto = makeCryptographyUserAdapter();
    paramsHelper = makeParamsHelper();
    repository = new RepoMemory();

    guard = new AuthUserGuard(crypto, paramsHelper, repository);
  });

  it('Should throw error if not receive token or id', async () => {
    try {
      await guard.execute({});
    } catch (error) {
      expect(error).toBeInstanceOf(CustomHttpException);
      expect(error as CustomHttpException).toEqual({
        statusCode: 401,
        message: ['Usuário não autenticado'],
        error: 'Unauthorized',
      });
    }
  });

  it('Should throw error if payload token not have id', async () => {
    const payload = { email: 'johndoe@example.com' };
    const paramsPayload = paramsHelper.createString(payload);
    const token = crypto.encrypt(paramsPayload);

    try {
      await guard.execute({ token });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomHttpException);
      expect(error as CustomHttpException).toEqual({
        statusCode: 401,
        message: ['Usuário não autenticado'],
        error: 'Unauthorized',
      });
    }
  });

  it('Should throw error if token is invalid', async () => {
    try {
      const token = 'any_token';

      await guard.execute({ token });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomHttpException);
      expect(error as CustomHttpException).toEqual({
        statusCode: 401,
        message: ['Token inválido'],
        error: 'Unauthorized',
      });
    }
  });

  it('Should throw error if user not found', async () => {
    const dataUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
    };
    const user = UserEntity.create(dataUser);

    await repository.create(user);

    const payload = { id: user.id };
    const paramsPayload = paramsHelper.createString(payload);
    const token = crypto.encrypt(paramsPayload);

    const userFound = await guard.execute({ token });

    expect(userFound).toEqual(user);
  });
});
