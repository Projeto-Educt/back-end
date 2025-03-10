import { makeValidatorFactory } from '@/main/factories/infra/make-validator.factory';
import { CustomHttpException } from '@/main/helpers';
import type { ValidatorContract } from '@/main/infra/contracts/validator.contract';
import { RegisterUserController } from '@/modules/user/application/controllers';
import type { RegisterUserUseCase } from '@/modules/user/application/usecases/register-user.usecase';
import { registerUserSchema } from '@/modules/user/infra';

describe('RegisterUserController', () => {
  let controller: RegisterUserController;
  let validator: ValidatorContract;
  let usecaseMock: jest.Mocked<RegisterUserUseCase>;

  beforeEach(() => {
    validator = makeValidatorFactory(registerUserSchema);
    usecaseMock = { execute: jest.fn() } as unknown as jest.Mocked<RegisterUserUseCase>;
    controller = new RegisterUserController(validator, usecaseMock);
  });

  it('Should return erro if field name is invalid', async () => {
    const data = {
      email: 'johndoe@example.com',
      password: '@Test123',
      confirmPassword: '@Test123',
    };
    const arrange = [
      { name: '', message: ['Por favor, insira seu nome completo.'] },
      { name: '            ', message: ['Por favor, insira seu nome completo.'] },
      { name: true, message: ['Por favor, insira uma string no campo name'] },
      { name: 123, message: ['Por favor, insira uma string no campo name'] },
      { name: 'less 7', message: ['Por favor, insira seu nome completo.'] },
      { name: 'more than 100'.repeat(10), message: ['O nome deve ter no máximo 100 caracteres.'] },
    ];

    for (const element of arrange) {
      try {
        await controller.execute({
          query: { callbackUrl: 'http://localhost:3000/confirm' },
          body: { ...data, name: element.name },
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

  it('Should return erro if field password is invalid', async () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      confirmPassword: '@Test123',
    };

    const messageErrorFormat =
      "O campo 'senha' deve ter o mínimo de 6 caracteres e conter letras maiúsculas e minúsculas, números e símbolos como ! @ # $ % & * =";

    const arrange = [
      {
        password: '',
        message: ['Por favor, insira uma senha forte.', messageErrorFormat],
      },
      {
        password: '            ',
        message: [messageErrorFormat],
      },
      { password: true, message: ['Por favor, insira uma string no campo password'] },
      { password: 123, message: ['Por favor, insira uma string no campo password'] },
      {
        password: 'less6',
        message: ['Por favor, insira uma senha forte.', messageErrorFormat],
      },
    ];

    for (const element of arrange) {
      try {
        await controller.execute({
          query: { callbackUrl: 'http://localhost:3000/confirm' },
          body: { ...data, password: element.password },
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

  it('Should return erro if field confirmPassword is invalid', async () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Test123',
    };

    const messageErrorFormat =
      "O campo 'confirmar senha' deve ter o mínimo de 6 caracteres e conter letras maiúsculas e minúsculas, números e símbolos como ! @ # $ % & * =";

    const arrange = [
      {
        confirmPassword: '',
        message: ['Por favor, confirme sua senha.', messageErrorFormat],
      },
      {
        confirmPassword: '            ',
        message: [messageErrorFormat],
      },
      {
        confirmPassword: true,
        message: ['Por favor, insira uma string no campo confirmPassword'],
      },
      {
        confirmPassword: 123,
        message: ['Por favor, insira uma string no campo confirmPassword'],
      },
      {
        confirmPassword: 'less6',
        message: ['Por favor, confirme sua senha.', messageErrorFormat],
      },
    ];

    for (const element of arrange) {
      try {
        await controller.execute({
          query: { callbackUrl: 'http://localhost:3000/confirm' },
          body: { ...data, confirmPassword: element.confirmPassword },
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

  it('Should return erro if password and confirmPassword are different', async () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Test123',
      confirmPassword: '@Test1234',
    };
    try {
      await controller.execute({
        query: { callbackUrl: 'http://localhost:3000/confirm' },
        body: data,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomHttpException);
      expect(error as CustomHttpException).toEqual({
        statusCode: 400,
        message: ['As senhas não coincidem.'],
        error: 'Bad Request',
      });
    }
  });

  it('Should call execute which correct values', async () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Test123',
      confirmPassword: '@Test123',
    };
    const spyExecute = jest.spyOn(usecaseMock, 'execute');
    await controller.execute({
      query: { callbackUrl: 'http://localhost:3000/confirm' },
      body: data,
    });
    expect(spyExecute).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Test123',
      callbackUrl: 'http://localhost:3000/confirm',
    });
  });
});
