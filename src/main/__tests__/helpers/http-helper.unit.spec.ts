import { CustomError } from '@/main/errors';
import {
  badRequest,
  conflict,
  create,
  CustomHttpException,
  forbidden,
  gatewayTimeout,
  noContent,
  notFound,
  ok,
  redirect,
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
  it('Should return ControllerResponse with correct values', () => {
    let arrange: any[] = [
      {
        body: { message: 'Success' },
        status: 200,
        func: (body: any) => ok(body),
      },
      {
        body: null,
        status: 200,
        func: (body: any) => ok(body),
      },
      {
        body: undefined,
        status: 200,
        func: (body: any) => ok(body),
      },
      {
        body: { message: 'Created' },
        status: 201,
        func: (body: any) => create(body),
        expectBody: true,
      },
      {
        body: null,
        status: 201,
        func: (body: any) => create(body),
      },
      {
        body: undefined,
        status: 201,
        func: (body: any) => create(body),
      },
      {
        body: true,
        status: 201,
        func: (body: any) => create(body),
        expectBody: true,
      },

      {
        body: null,
        status: 204,
        func: () => noContent(),
      },
    ];

    for (const element of arrange) {
      expect(element.func(element.body)).toEqual({
        statusCode: element.status,
        ...(element.body && { body: element.body }),
      });
    }

    arrange = [
      {
        body: 'https://google.com',
        status: 302,
        func: (body: any) => redirect(body),
      },
      {
        body: null,
        status: 302,
        func: (body: any) => redirect(body),
      },
    ];
    for (const element of arrange) {
      expect(element.func(element.body)).toEqual({
        statusCode: element.status,
        body: { url: element.body },
      });
    }
  });
});
