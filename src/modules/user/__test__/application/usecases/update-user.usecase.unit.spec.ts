import { CustomError } from '@/main/errors';
import { RepositoryInMemory } from '@/main/infra';
import { UpdateUserUseCase } from '@/modules/user/application/usecases';
import { EDUCATION_LEVEL, INTEREST_COURSES, INTEREST_UNIVERSITIES } from '@/modules/user/constants';
import { NameVo } from '@/modules/user/domain';
import { UserEntity } from '@/modules/user/domain/user.entity';

class UserRepoMemory extends RepositoryInMemory<UserEntity> {}

describe('UpdateUserUseCase', () => {
  let userRepository: UserRepoMemory;
  let sut: UpdateUserUseCase;
  let user: UserEntity;

  beforeEach(async () => {
    userRepository = new UserRepoMemory();
    sut = new UpdateUserUseCase(userRepository);

    user = UserEntity.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
    });

    await userRepository.create(user);
  });

  it('Should throw if user not found', async () => {
    try {
      await sut.execute({
        id: 'invalid-id',
        name: 'John Doe',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).messages).toEqual(['id: invalid-id, not found']);
    }
  });

  it('Should throw if received invalid data', async () => {
    try {
      await sut.execute({
        id: user.id,
        name: 'ca',
        email: 'invalid-email',
        educationLevel: 'any_education_level',
        interestCourse: 'any_interest_course',
        interestUniversity: 'any_interest_university',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).messages).toEqual([
        'Por favor, insira um nível de ensino válido',
        'Por favor, insira um curso de seu interesse',
        'Por favor, insira uma Faculdade de seu interesse',
        'Por favor, insira um e-mail válido (ex: usuario@dominio.com).',
        'Por favor, insira seu nome completo.',
      ]);
    }
  });

  it('Should update user', async () => {
    const data = {
      id: user.id,
      name: 'John Doe updated',
      email: 'johndoe@exampleUpdated.com',
      password: '@Password123Updated',
      isActive: true,
      educationLevel: EDUCATION_LEVEL[0],
      interestCourse: INTEREST_COURSES[0],
      interestUniversity: INTEREST_UNIVERSITIES[0],
    };
    await sut.execute(data);

    const userUpdated = await userRepository.findOne({ field: 'id', value: data.id });

    expect(userUpdated.toJSON()).toStrictEqual({
      id: userUpdated.id,
      name: expect.any(NameVo),
      email: data.email,
      password: user.password,
      isActive: true,
      interestCourse: data.interestCourse,
      interestUniversity: data.interestUniversity,
      educationLevel: data.educationLevel,
    });

    expect(userUpdated.name).toBe(data.name);
  });
});
