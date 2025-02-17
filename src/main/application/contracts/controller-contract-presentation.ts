import type { ControllerRequestType, ControllerResponseType } from '@/main/types';

export interface ControllerContractPresentation {
  execute: (request: ControllerRequestType) => Promise<ControllerResponseType>;
  handle: (request: ControllerRequestType) => Promise<ControllerResponseType>;
}
