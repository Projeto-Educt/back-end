import { makeValidatorFactory } from '@/main/factories/infra/make-validator.factory';
import { CustomHttpException, redirect } from '@/main/helpers';
import type { CryptographyContract } from '@/main/infra';
import type { ValidatorContract } from '@/main/infra/contracts/validator.contract';
import { ActiveUserController } from '@/modules/user/application/controllers';
import type { ActiveUserUseCase } from '@/modules/user/application/usecases';
import { makeCryptographyUserAdapter } from '@/modules/user/factories/adapter/cryptography.factory';
import { activeUserSchema } from '@/modules/user/infra';

describe('RegisterUserController', () => {
  let controller: ActiveUserController;
  let validator: ValidatorContract;
  let crypto: CryptographyContract;
  let usecaseMock: jest.Mocked<ActiveUserUseCase>;

  beforeEach(() => {
    validator = makeValidatorFactory(activeUserSchema);
    usecaseMock = { execute: jest.fn() } as unknown as jest.Mocked<ActiveUserUseCase>;
    crypto = makeCryptographyUserAdapter();
    controller = new ActiveUserController(validator, usecaseMock, crypto);
  });

  it('Should return erro if field email is invalid', async () => {
    const arrange = [
      { email: '', message: ['Por favor, insira um e-mail válido (ex: usuario@dominio.com).'] },
      {
        email: '            ',
        message: ['Por favor, insira um e-mail válido (ex: usuario@dominio.com).'],
      },
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
          query: { token: crypto.encrypt(`${element.email}--http://localhost:3000/confirm`) },
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
    const arrange = [
      {
        callbackUrl: '',
        message: ['Por favor, insira uma url válida.'],
      },
      {
        callbackUrl: '            ',
        message: ['Por favor, insira uma url válida.'],
      },
    ];

    for (const element of arrange) {
      try {
        await controller.execute({
          query: { token: crypto.encrypt(`johndoe@example.com--${element.callbackUrl}`) },
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

  it('Should call execute which correct values', async () => {
    const spyExecute = jest.spyOn(usecaseMock, 'execute');
    await controller.execute({
      query: { token: crypto.encrypt('johndoe@example.com--http://localhost:3000/confirm') },
    });
    expect(spyExecute).toHaveBeenCalledWith({
      email: 'johndoe@example.com',
    });
  });

  it('Should return 302 with callbackUrl', async () => {
    const response = await controller.execute({
      query: { token: crypto.encrypt('johndoe@example.com--http://localhost:3000/confirm') },
    });
    expect(response).toEqual(redirect('http://localhost:3000/confirm'));
  });
});
