import { Controller } from '@/main/application/controller';
import { redirect } from '@/main/helpers';
import type { CryptographyContract } from '@/main/infra';
import type { ValidatorContract } from '@/main/infra/contracts/validator.contract';
import type { ControllerRequestType, ControllerResponseType } from '@/main/types';
import type { ActiveUserUseCase } from '@/modules/user/application/usecases/active-user.usecase';

export class ActiveUserController extends Controller {
  constructor(
    private readonly validator: ValidatorContract,
    private readonly activeUser: ActiveUserUseCase,
    private readonly cryptography: CryptographyContract,
  ) {
    super();
  }

  async execute(request: ControllerRequestType): Promise<ControllerResponseType> {
    const { token } = request.query;

    const [email, callbackUrl] = this.cryptography.decrypt(token).split('--');

    this.validator.validate({
      email,
      callbackUrl,
    });

    await this.activeUser.execute({ email });
    return redirect(callbackUrl);
  }
}
