import { Controller } from '@/main/application/controller';
import { noContent } from '@/main/helpers';
import type { ValidatorContract } from '@/main/infra/contracts/validator.contract';
import type { ControllerRequestType, ControllerResponseType } from '@/main/types';
import type { RegisterStudentUseCase } from '../usecases/register-student.usecase';

export class RegisterStudentController extends Controller {
  constructor(
    private readonly validator: ValidatorContract,
    private readonly registerStudentUseCase: RegisterStudentUseCase,
  ) {
    super();
  }

  async execute(request: ControllerRequestType): Promise<ControllerResponseType> {
    const { callbackUrl } = request.query;

    this.validator.validate({ ...request.body, callbackUrl });

    const { name, email, password } = request.body;

    await this.registerStudentUseCase.execute({
      name,
      email,
      password,
      callbackUrl,
    });
    return noContent();
  }
}
