import { Controller } from '@/main/application/controller';
import { create } from '@/main/helpers';
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

    const data = { ...request.body, callbackUrl };

    this.validator.validate(data);

    const { id } = await this.registerUserUseCase.execute({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackUrl,
    });
    return create({ id });
  }
}
