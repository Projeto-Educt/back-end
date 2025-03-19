import { Controller } from '@/main/application/controller';
import { noContent } from '@/main/helpers';
import type { ValidatorContract } from '@/main/infra/contracts/validator.contract';
import type { ControllerRequestType, ControllerResponseType } from '@/main/types';
import type { ResendEmailRegisterUserUseCase } from '@/modules/user/application/usecases/resend-register-user-email.usecase';

export class ResendRegisterUserEmailController extends Controller {
  constructor(
    private readonly validator: ValidatorContract,
    private readonly resendEmailUsecase: ResendEmailRegisterUserUseCase,
  ) {
    super();
  }

  async execute(request: ControllerRequestType): Promise<ControllerResponseType> {
    const { callbackUrl } = request.query;
    const data = { ...request.body, callbackUrl };

    this.validator.validate(data);

    await this.resendEmailUsecase.execute(data);
    return noContent();
  }
}
