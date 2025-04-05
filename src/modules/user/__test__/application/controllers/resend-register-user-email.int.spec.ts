import { makeValidatorFactory } from '@/main/factories/infra/make-validator.factory';
import { CustomHttpException, noContent } from '@/main/helpers';
import type { ValidatorContract } from '@/main/infra/contracts/validator.contract';
import { ResendRegisterUserEmailController } from '@/modules/user/application/controllers';
import type { ResendEmailRegisterUserUseCase } from '@/modules/user/application/usecases/resend-register-user-email.usecase';
import { resendRegisterUserEmailSchema } from '@/modules/user/infra';

describe('RegisterUserController', () => {
  let controller: ResendRegisterUserEmailController;
  let validator: ValidatorContract;
  let usecaseMock: jest.Mocked<ResendEmailRegisterUserUseCase>;

  beforeEach(() => {
    validator = makeValidatorFactory(resendRegisterUserEmailSchema);
    usecaseMock = { execute: jest.fn() } as unknown as jest.Mocked<ResendEmailRegisterUserUseCase>;
    controller = new ResendRegisterUserEmailController(validator, usecaseMock);
  });

  it('Should return erro if field email is invalid', async () => {
    const data = {
      name: 'John Doe',
      password: '@Test123',
      confirmPassword: '@Test123',
    };
    const arrange = [
      { email: '', message: ['Por favor, insira um e-mail válido (ex: usuario@dominio.com).'] },
      {
        email: '            ',
        message: ['Por favor, insira um e-mail válido (ex: usuario@dominio.com).'],
      },
      { email: true, message: ['Por favor, insira uma string no campo email'] },
      { email: 123, message: ['Por favor, insira uma string no campo email'] },
      {
        email: 'less 7',
        message: ['Por favor, insira um e-mail válido (ex: usuario@dominio.com).'],
      },
      {
        email: 'more_than_200'.repeat(20) + '@email.com',
        message: ['O e-mail deve ter no máximo 255 caracteres.'],
      },
    ];

    for (const element of arrange) {
      try {
        await controller.execute({
          query: { callbackUrl: 'http://localhost:3000/confirm' },
          body: { ...data, email: element.email },
        });
      } catch (error) {
        expect(error).toBeInstanceOf(CustomHttpException);
        expect(error as CustomHttpException).toEqual({
          statusCode: 400,
          message: element.message,
          error: 'Bad Request',
        });
      }
    }
  });

  it('Should return erro if field callbackUrl is invalid', async () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Test123',
      confirmPassword: '@Test123',
    };
    const arrange = [
      {
        callbackUrl: '',
        message: ['Por favor, insira uma url válida.'],
      },
      {
        callbackUrl: '            ',
        message: ['Por favor, insira uma url válida.'],
      },
      {
        callbackUrl: true,
        message: ['Por favor, insira uma string no campo callbackUrl'],
      },
      {
        callbackUrl: 123,
        message: ['Por favor, insira uma string no campo callbackUrl'],
      },
    ];

    for (const element of arrange) {
      try {
        await controller.execute({ query: { callbackUrl: element.callbackUrl }, body: data });
      } catch (error) {
        expect(error).toBeInstanceOf(CustomHttpException);
        expect(error as CustomHttpException).toEqual({
          statusCode: 400,
          message: element.message,
          error: 'Bad Request',
        });
      }
    }
  });

  it('Should call execute which correct values', async () => {
    const data = {
      email: 'johndoe@example.com',
    };
    const spyExecute = jest.spyOn(usecaseMock, 'execute');
    await controller.execute({
      query: { callbackUrl: 'http://localhost:3000/confirm' },
      body: data,
    });
    expect(spyExecute).toHaveBeenCalledWith({
      email: 'johndoe@example.com',
      callbackUrl: 'http://localhost:3000/confirm',
    });
  });

  it('Should return 204', async () => {
    const data = {
      email: 'johndoe@example.com',
    };
    const response = await controller.execute({
      query: { callbackUrl: 'http://localhost:3000/confirm' },
      body: data,
    });
    expect(response).toEqual(noContent());
  });
});
