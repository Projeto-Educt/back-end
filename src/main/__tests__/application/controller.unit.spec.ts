import { Controller } from '@/main/application/controller';
import { CustomError } from '@/main/errors';
import { CustomHttpException } from '@/main/helpers';
import type { ControllerRequestType, ControllerResponseType } from '@/main/types';

describe('Controller', () => {
  class TestController extends Controller {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async execute(request: ControllerRequestType): Promise<ControllerResponseType> {
      return { statusCode: 200, body: 'test data' };
    }
  }

  let controller: TestController;

  beforeEach(() => {
    controller = new TestController();
  });

  it('should call execute and return the result on success', async () => {
    const request: ControllerRequestType = { body: {}, headers: {}, params: {}, query: {} };
    const result = await controller.handle(request);
    expect(result).toEqual({ statusCode: 200, body: 'test data' });
  });

  it('should handle CustomHttpException and format the error response', async () => {
    const request: ControllerRequestType = { body: {}, headers: {}, params: {}, query: {} };
    const customError = new CustomHttpException({
      statusCode: 404,
      error: 'Not Found',
      message: ['Not Found'],
    });
    const executeMock = jest.spyOn(controller, 'execute');
    executeMock.mockRejectedValue(customError);

    const result = await controller.handle(request);

    expect(result).toEqual({ statusCode: 404, body: { message: ['Not Found'] } });
  });

  it('should handle CustomError and format the error response', async () => {
    const request: ControllerRequestType = { body: {}, headers: {}, params: {}, query: {} };
    const customError = new CustomError(['Error 1', 'Error 2']);
    const executeMock = jest.spyOn(controller, 'execute');
    executeMock.mockRejectedValue(customError);

    const result = await controller.handle(request);

    expect(result).toEqual({ statusCode: 400, body: { message: ['Error 1', 'Error 2'] } });
  });

  it('should handle generic errors and format the error response', async () => {
    const request: ControllerRequestType = { body: {}, headers: {}, params: {}, query: {} };
    const genericError = new Error('Generic error');
    const executeMock = jest.spyOn(controller, 'execute');
    executeMock.mockRejectedValue(genericError);

    const result = await controller.handle(request);

    expect(result).toEqual({
      statusCode: 500,
      body: { message: ['Something went wrong. Please try again later.'] },
    });
  });
});
