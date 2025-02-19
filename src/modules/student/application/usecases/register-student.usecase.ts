import type { UseCase } from '@/main/application/contracts/usecase';
import { CustomError } from '@/main/errors';
import type { DispatcherContract } from '@/main/events';
import { conflict } from '@/main/helpers';
import type { StudentRepositoryContract } from '@/modules/student/contracts';
import { StudentEntity, type CreateStudentProps } from '@/modules/student/domain/student.entity';
import type { RegisteredStudentEvent } from '@/modules/student/events';

type RegisterStudentInput = CreateStudentProps & {
  callbackUrl: string;
};

type RegisterStudentOutput = void;

export class RegisterStudentUseCase
  implements UseCase<RegisterStudentInput, RegisterStudentOutput>
{
  constructor(
    private studentRepository: StudentRepositoryContract,
    private event: RegisteredStudentEvent,
    private dispatcher: DispatcherContract,
  ) {}
  async execute(input: RegisterStudentInput): Promise<RegisterStudentOutput> {
    const student = StudentEntity.create(input);

    const studentExists = await this.studentRepository.findOneOrNull({
      field: 'email',
      values: student.email,
    });

    if (studentExists) {
      throw conflict(new CustomError('E-mail já cadastrado'));
    }

    await this.studentRepository.create(student);

    this.event.setPayload({
      name: student.name,
      email: student.email,
      callbackUrl: input.callbackUrl,
    });
    this.dispatcher.dispatch(this.event);
    return;
  }
}
