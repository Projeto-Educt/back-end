import { makeValidatorFactory } from '@/main/factories/infra/make-validator.factory';
import { CustomHttpException, noContent } from '@/main/helpers';
import type { ValidatorContract } from '@/main/infra/contracts/validator.contract';
import { UpdateUserController } from '@/modules/user/application/controllers';
import type { UpdateUserUseCase } from '@/modules/user/application/usecases';
import { EDUCATION_LEVEL, INTEREST_COURSES, INTEREST_UNIVERSITIES } from '@/modules/user/constants';
import { updateUserSchema } from '@/modules/user/infra';

describe('RegisterUserController', () => {
  let controller: UpdateUserController;
  let validator: ValidatorContract;
  let usecaseMock: jest.Mocked<UpdateUserUseCase>;
  const userId = '80fec1ab-b4ce-441f-a7a2-560c23d6b87e';

  beforeEach(() => {
    validator = makeValidatorFactory(updateUserSchema);
    usecaseMock = { execute: jest.fn() } as unknown as jest.Mocked<UpdateUserUseCase>;
    controller = new UpdateUserController(validator, usecaseMock);
  });

  it('Should return bad request if no fields are provided', async () => {
    try {
      await controller.execute({
        session: { user: { id: userId } },
        body: {},
      });
      fail();
    } catch (error) {
      expect(error).toBeInstanceOf(CustomHttpException);
      expect(error as CustomHttpException).toEqual({
        statusCode: 400,
        message: ['Por favor, insira ao menos um campo para atualizar.'],
        error: 'Bad Request',
      });
    }
  });

  it('Should throw if id is invalid', async () => {
    const arrange = [
      { id: '', message: ['Por favor, insira um id valido.'] },
      { id: '    ', message: ['Por favor, insira um id valido.'] },
      { id: '126858-cacnan-mioan', message: ['Por favor, insira um id valido.'] },
      { id: true, message: ['Por favor, insira uma string no campo id'] },
      { id: 123, message: ['Por favor, insira uma string no campo id'] },
    ];

    for (const element of arrange) {
      try {
        await controller.execute({
          session: { user: { id: element.id } },
          body: { name: 'John Doe' },
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

  it('Should throw if name is invalid', async () => {
    const arrange = [
      { name: true, message: ['Por favor, insira uma string no campo name'] },
      { name: 123, message: ['Por favor, insira uma string no campo name'] },
      { name: 'less 7', message: ['Por favor, insira seu nome completo.'] },
      { name: 'more than 100'.repeat(10), message: ['O nome deve ter no máximo 100 caracteres.'] },
    ];

    for (const element of arrange) {
      try {
        await controller.execute({
          session: { user: { id: userId } },
          body: { name: element.name },
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
    const arrange = [
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
          session: { user: { id: userId } },
          body: { email: element.email },
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

  it('Should return erro if field educationLevel is invalid', async () => {
    const arrage = [
      { educationLevel: true, message: ['Por favor, insira uma string no campo educationLevel'] },
      { educationLevel: 123, message: ['Por favor, insira uma string no campo educationLevel'] },
      {
        educationLevel: 'any_level',
        message: ['Por favor, insira um nível de ensino válido.'],
      },
    ];

    for (const element of arrage) {
      try {
        await controller.execute({
          session: { user: { id: userId } },
          body: { educationLevel: element.educationLevel },
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

  it('Should return erro if field interestCourse is invalid', async () => {
    const arrange = [
      { interestCourse: true, message: ['Por favor, insira uma string no campo interestCourse'] },
      { interestCourse: 123, message: ['Por favor, insira uma string no campo interestCourse'] },
      {
        interestCourse: 'any_level',
        message: ['Por favor, insira um curso de seu interesse'],
      },
    ];

    for (const element of arrange) {
      try {
        await controller.execute({
          session: { user: { id: userId } },
          body: { interestCourse: element.interestCourse },
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

  it('Should return erro if field interestUniversity is invalid', async () => {
    const arrange = [
      {
        interestUniversity: true,
        message: ['Por favor, insira uma string no campo interestUniversity'],
      },
      {
        interestUniversity: 123,
        message: ['Por favor, insira uma string no campo interestUniversity'],
      },
      {
        interestUniversity: 'any_level',
        message: ['Por favor, insira uma Faculdade de seu interesse'],
      },
    ];

    for (const element of arrange) {
      try {
        await controller.execute({
          session: { user: { id: userId } },
          body: { interestUniversity: element.interestUniversity },
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

  it('Should call execute which correct values and return 204', async () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      educationLevel: EDUCATION_LEVEL[0],
      interestCourse: INTEREST_COURSES[0],
      interestUniversity: INTEREST_UNIVERSITIES[0],
    };
    const spyExecute = jest.spyOn(usecaseMock, 'execute');
    const response = await controller.execute({
      session: { user: { id: userId } },
      body: data,
    });
    expect(spyExecute).toHaveBeenCalledWith({ ...data, id: userId });
    expect(response).toEqual(noContent());
  });
});
