import { Controller } from '@/main/application/controller';
import { noContent } from '@/main/helpers';
import type { ValidatorContract } from '@/main/infra/contracts/validator.contract';
import type { ControllerRequestType, ControllerResponseType } from '@/main/types';
import type { UpdateUserUseCase } from '../usecases';

export class UpdateUserController extends Controller {
  constructor(
    private readonly validator: ValidatorContract,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {
    super();
  }

  async execute(request: ControllerRequestType): Promise<ControllerResponseType> {
    const { id } = request.session.user;
    const data = { ...request.body, id };

    this.validator.validate(data);

    await this.updateUserUseCase.execute(data);

    return noContent();
  }
}
