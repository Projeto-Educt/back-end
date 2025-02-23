import type { CustomError } from '../errors';
import type { ControllerResponseType } from '../types';

type HttpResponseError = {
  statusCode: number;
  error: string;
  message: string[];
};

export class CustomHttpException {
  statusCode: number;
  error: string;
  message: string[];
  constructor(props: HttpResponseError) {
    this.statusCode = props.statusCode;
    this.error = props.error;
    this.message = props.message;
  }
}

export const badRequest = (error: CustomError): CustomHttpException => {
  return new CustomHttpException({
    statusCode: 400,
    error: 'Bad Request',
    message: error.messages,
  });
};

export const ok = (body?: any): ControllerResponseType => {
  return {
    statusCode: 200,
    ...(body && { body }),
  };
};

export const create = (body?: any): ControllerResponseType => {
  return {
    statusCode: 201,
    ...(body && { body }),
  };
};

export const noContent = (): ControllerResponseType => {
  return {
    statusCode: 204,
  };
};

export const redirect = (url: string): ControllerResponseType => {
  return {
    statusCode: 302,
    body: { url },
  };
};

export const unauthorized = (error: CustomError): CustomHttpException => {
  return new CustomHttpException({
    statusCode: 401,
    error: 'Unauthorized',
    message: error.messages,
  });
};

export const forbidden = (error: CustomError): CustomHttpException => {
  return new CustomHttpException({
    statusCode: 403,
    error: 'Forbidden',
    message: error.messages,
  });
};

export const notFound = (error: CustomError): CustomHttpException => {
  return new CustomHttpException({
    statusCode: 404,
    error: 'Not Found',
    message: error.messages,
  });
};

export const conflict = (error: CustomError): CustomHttpException => {
  return new CustomHttpException({
    statusCode: 409,
    error: 'Conflict',
    message: error.messages,
  });
};

export const unprocessableEntity = (error: CustomError): CustomHttpException => {
  return new CustomHttpException({
    statusCode: 422,
    error: 'Unprocessable Entity',
    message: error.messages,
  });
};

export const gatewayTimeout = (): CustomHttpException => {
  return new CustomHttpException({
    statusCode: 504,
    error: 'Gateway Timeout',
    message: [
      'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.',
    ],
  });
};

export const serverError = (): CustomHttpException => {
  return new CustomHttpException({
    statusCode: 500,
    error: 'Internal Server Error',
    message: ['Something went wrong. Please try again later.'],
  });
};
