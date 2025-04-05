import type { ControllerContractPresentation } from '@/main/application';
import { NestRouterAdapter } from '@/main/infra';

export const makeNestRouter = (controller: ControllerContractPresentation): NestRouterAdapter => {
  return new NestRouterAdapter(controller);
};
