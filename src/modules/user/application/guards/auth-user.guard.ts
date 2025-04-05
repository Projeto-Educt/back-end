import type { Guard } from '@/main/application/contracts/guards-contract';
import { CustomError } from '@/main/errors';
import { unauthorized } from '@/main/helpers';
import type { ParamsHelper } from '@/main/helpers/params.helper';
import type { CryptographyContract } from '@/main/infra';
import type { UserRepositoryContract } from '../../contracts';
import type { UserEntity } from '../../domain/user.entity';

type Input = {
  token?: string;
  id?: string;
};

type Output = UserEntity;

export class AuthUserGuard implements Guard<Input, Output> {
  constructor(
    private readonly crypto: CryptographyContract,
    private readonly token: ParamsHelper,
    private readonly repository: UserRepositoryContract,
  ) {}
  async execute({ token, id }: Input): Promise<Output> {
    const userId = token ? this._getIdByToken(token) : id;

    if (!userId) {
      throw unauthorized(new CustomError(['Usuário não autenticado']));
    }

    return await this.repository.findOne({ field: 'id', value: userId });
  }

  private _getIdByToken(token: string): string {
    try {
      const decrypted = this.crypto.decrypt(token);
      const { id } = this.token.createObj(decrypted);
      return id as string;
    } catch (error) {
      throw unauthorized(new CustomError(['Token inválido']));
    }
  }
}
