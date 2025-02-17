import { CustomError } from '../errors';
import { CustomHttpException } from '../helpers';
import type { ControllerRequestType, ControllerResponseType } from '../types';
import type { ControllerContractPresentation } from './contracts/controller-contract-presentation';

export abstract class Controller implements ControllerContractPresentation {
  abstract execute(request: ControllerRequestType): Promise<ControllerResponseType>;
  async handle(request: ControllerRequestType): Promise<ControllerResponseType> {
    try {
      return await this.execute(request);
    } catch (error) {
      return this._formatError(error);
    }
  }

  private _formatError(error: any): ControllerResponseType {
    if (error instanceof CustomHttpException) {
      return { statusCode: error.statusCode, body: { message: error.message } };
    }
    if (error instanceof CustomError) {
      return { statusCode: 400, body: { message: error.messages } };
    }

    return {
      statusCode: 500,
      body: { message: ['Something went wrong. Please try again later.'] },
    };
  }
}
