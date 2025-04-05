import { Controller } from '@/main/application/controller';
import { ok } from '@/main/helpers';
import type { ControllerResponseType } from '@/main/types';
import type { ListInterestCourseUsecase } from '@/modules/user/application/usecases';

export class ListInterestCourseController extends Controller {
  constructor(private readonly listInterestCourseUsecase: ListInterestCourseUsecase) {
    super();
  }
  async execute(): Promise<ControllerResponseType> {
    const list = await this.listInterestCourseUsecase.execute();
    return ok(list);
  }
}
