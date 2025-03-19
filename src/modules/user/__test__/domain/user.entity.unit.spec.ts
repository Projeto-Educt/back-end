import { CustomError } from '@/main/errors';
import { NameVo } from '../../domain';
import { UserEntity } from '../../domain/user.entity';

describe('UserEntity', () => {
  it('should throw erros', () => {
    try {
      UserEntity.create({
        name: '',
        email: '',
        password: '',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).messages).toEqual([
        'Por favor, insira um e-mail válido (ex: usuario@dominio.com).',
        'Por favor, insira uma senha forte.',
        'A senha deve ter o mínimo de 6 caracteres e conter letras maiúsculas e minúsculas, números e símbolos como ! @ # $ % & * =',
        'Por favor, insira seu nome completo.',
        'O nome deve conter apenas letras, espaços e hifens.',
      ]);
    }
  });

  it('should create correct instance to new user', () => {
    const data = {
      name: '   John Doe    ',
      email: '    johndoe@example.com   ',
      password: '   @Password123    ',
    };

    const user = UserEntity.create(data);

    expect(user).toBeInstanceOf(UserEntity);

    expect(user.toJSON()).toEqual({
      id: user.id.value,
      name: expect.any(NameVo),
      email: data.email.trim(),
      password: data.password.trim(),
      isActive: false,
    });
    expect(user.name).toBe(data.name.trim());
    expect(user.email).toBe(data.email.trim());
    expect(user.password).toBe(data.password.trim());
    expect(user.nameVo).toBeInstanceOf(NameVo);
    expect(user.isActive).toBe(false);
  });

  it('should create correct instance to update user', () => {
    const data = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: '   John Doe    ',
      email: '    johndoe@example.com   ',
      password: '   @Password123    ',
      isActive: true,
    };

    const user = UserEntity.create(data);

    expect(user.toJSON()).toEqual({
      id: user.id.value,
      name: expect.any(NameVo),
      email: data.email.trim(),
      password: data.password.trim(),
      isActive: true,
    });
    expect(user.name).toBe(data.name.trim());
    expect(user.email).toBe(data.email.trim());
    expect(user.password).toBe(data.password.trim());
    expect(user.nameVo).toBeInstanceOf(NameVo);
    expect(user.isActive).toBe(true);
  });

  it('should activate user', () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
    };

    const user = UserEntity.create(data);

    expect(user.isActive).toBe(false);

    user.activate();

    expect(user.isActive).toBe(true);
  });

  it('should deactivate user', () => {
    const data = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
      isActive: true,
    };

    const user = UserEntity.create(data);

    expect(user.isActive).toBe(true);

    user.deactivate();

    expect(user.isActive).toBe(false);
  });
});
