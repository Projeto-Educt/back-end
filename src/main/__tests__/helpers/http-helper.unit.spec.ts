import { CustomError } from '@/main/errors';
import {
  badRequest,
  conflict,
  CustomHttpException,
  forbidden,
  gatewayTimeout,
  notFound,
  serverError,
  unauthorized,
  unprocessableEntity,
} from '@/main/helpers';

describe('badRequest()', () => {
  it('Should return CustomHttpException with correct values', () => {
    const arrange = [
      {
        status: 400,
        error: 'Bad Request',
        message: 'Error message badRequest',
        func: (value: CustomError) => badRequest(value),
      },
      {
        status: 401,
        error: 'Unauthorized',
        message: 'Error message unauthorized',
        func: (value: CustomError) => unauthorized(value),
      },
      {
        status: 403,
        error: 'Forbidden',
        message: 'Error message forbidden',
        func: (value: CustomError) => forbidden(value),
      },
      {
        status: 404,
        error: 'Not Found',
        message: 'Error message notFound',
        func: (value: CustomError) => notFound(value),
      },
      {
        status: 409,
        error: 'Conflict',
        message: 'Error message conflict',
        func: (value: CustomError) => conflict(value),
      },
      {
        status: 422,
        error: 'Unprocessable Entity',
        message: 'Error message unprocessableEntity',
        func: (value: CustomError) => unprocessableEntity(value),
      },
      {
        status: 500,
        error: 'Internal Server Error',
        message: 'Something went wrong. Please try again later.',
        func: () => serverError(),
      },
      {
        status: 504,
        error: 'Gateway Timeout',
        message:
          'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.',
        func: () => gatewayTimeout(),
      },
    ];

    for (const element of arrange) {
      const error = new CustomError([element.message]);

      const response = element.func(error);

      expect(response).toBeInstanceOf(CustomHttpException);
      expect(response).toEqual({
        statusCode: element.status,
        error: element.error,
        message: [element.message],
      });
    }
  });
});
