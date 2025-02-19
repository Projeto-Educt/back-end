import type { ControllerContractPresentation } from '@/main/application';
import { Presenter } from '@/main/application';
import type { ControllerRequestType } from '@/main/types';
import type { Request, Response } from 'express';

export class NestRouterAdapter {
  constructor(private readonly controller: ControllerContractPresentation) {}

  async adapt(req: Request, res: Response) {
    const request = this._requestToController(req);

    const response = await this.controller.handle(request);

    return this._responseToNest(response, res, req.headers['accept']);
  }

  private _requestToController(request: Request): ControllerRequestType {
    return {
      headers: request.headers,
      body: request.body,
      params: request.params,
      query: request.query,
    };
  }

  private _responseToNest(response: any, res: Response, accept?: string) {
    const presenterFormat = Presenter.execute(response.body, accept);
    return res.status(response.statusCode).send(presenterFormat);
  }
}
