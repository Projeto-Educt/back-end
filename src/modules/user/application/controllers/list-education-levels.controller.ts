import { Controller } from '@/main/application/controller';
import { ok } from '@/main/helpers';
import type { ControllerResponseType } from '@/main/types';
import type { ListEducationLevelsUsecase } from '@/modules/user/application/usecases';

export class ListEducationLevelsController extends Controller {
  constructor(private readonly listEducationLevelsUsecase: ListEducationLevelsUsecase) {
    super();
  }
  async execute(): Promise<ControllerResponseType> {
    const list = await this.listEducationLevelsUsecase.execute();
    return ok(list);
  }
}
