import { Controller } from '@/main/application/controller';
import { noContent } from '@/main/helpers';
import type { ValidatorContract } from '@/main/infra/contracts/validator.contract';
import type { ControllerRequestType, ControllerResponseType } from '@/main/types';
import type { RegisterUserUseCase } from '@/modules/user/application/usecases/register-user.usecase';

export class RegisterUserController extends Controller {
  constructor(
    private readonly validator: ValidatorContract,
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) {
    super();
  }

  async execute(request: ControllerRequestType): Promise<ControllerResponseType> {
    const { callbackUrl } = request.query;

    this.validator.validate({ ...request.body, callbackUrl });

    const { name, email, password } = request.body;

    await this.registerUserUseCase.execute({
      name,
      email,
      password,
      callbackUrl,
    });
    return noContent();
  }
}
