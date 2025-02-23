import type { ClientDb } from '@/main/helpers/client-db--helper';
import type { FindFieldsProps } from '@/main/infra';
import type { StudentRepositoryContract } from '@/modules/student/contracts';
import { StudentEntity } from '@/modules/student/domain/student.entity';

export class StudentRepositoryInfra implements StudentRepositoryContract {
  constructor(private readonly clientDb: ClientDb) {}
  async findOneOrNull(props: FindFieldsProps): Promise<StudentEntity | null> {
    const student = await this.clientDb.student.findFirst({
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

    return student ? StudentEntity.create(student) : null;
  }
  async create(entity: StudentEntity): Promise<void> {
    await this.clientDb.student.create({
      data: {
        name: entity.name,
        email: entity.email,
        password: entity.password,
      },
    });
  }
}
