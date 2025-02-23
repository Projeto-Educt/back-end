import { RegisterStudentUseCase } from '@/modules/student/application/usecases/register-student.usecase';
import { makeStudentRepository } from '@/modules/student/factories/infra/repository.factory';
import { makeRegisteredStudentEvent } from '../../events/make-registered-student.factory';

export const makeRegisterStudentUseCase = async () => {
  const studentRepository = await makeStudentRepository();
  const { dispatcher, event } = makeRegisteredStudentEvent();
  return new RegisterStudentUseCase(studentRepository, event, dispatcher);
};
