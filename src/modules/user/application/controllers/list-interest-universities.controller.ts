import { Controller } from '@/main/application/controller';
import { ok } from '@/main/helpers';
import type { ControllerResponseType } from '@/main/types';
import type { ListInterestUniversitiesUsecase } from '../usecases';

export class ListInterestUniversitiesController extends Controller {
  constructor(private readonly listInterestUniversitiesUsecase: ListInterestUniversitiesUsecase) {
    super();
  }
  async execute(): Promise<ControllerResponseType> {
    const list = await this.listInterestUniversitiesUsecase.execute();
    return ok(list);
  }
}
