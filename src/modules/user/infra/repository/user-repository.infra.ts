import { CustomError } from '@/main/errors';
import { notFound } from '@/main/helpers';
import type { ClientDb } from '@/main/helpers/client-db--helper';
import type { FindFieldsProps } from '@/main/infra';
import type { UserRepositoryContract } from '@/modules/user/contracts';
import { UserEntity } from '@/modules/user/domain/user.entity';

export class UserRepositoryInfra implements UserRepositoryContract {
  constructor(private readonly clientDb: ClientDb) {}
  async findOneOrNull(props: FindFieldsProps): Promise<UserEntity | null> {
    const user = await this.clientDb.user.findFirst({
      where: {
        [props.field]: {
          equals: props.values,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    return user ? UserEntity.create(user) : null;
  }
  async create(entity: UserEntity): Promise<void> {
    await this.clientDb.user.create({
      data: {
        name: entity.name,
        email: entity.email,
        password: entity.password,
        isActive: entity.isActive,
      },
    });
  }

  async findOne(props: FindFieldsProps): Promise<UserEntity> {
    const user = await this.clientDb.user.findFirst({
      where: {
        [props.field]: {
          equals: props.values,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        isActive: true,
      },
    });

    if (!user) {
      throw notFound(new CustomError(`Usuário não encontrado.`));
    }

    return UserEntity.create(user);
  }
}
