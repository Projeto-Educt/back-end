import { Entity, UniqueEntityId } from '@/main/domain';
import { NameVo } from './value-objects/name.vo';

export type studentEntityProps = {
  id?: UniqueEntityId;
  name: NameVo;
  email: string;
  password: string;
};

export type CreateStudentProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

export class studentEntity extends Entity<studentEntityProps> {
  readonly name: string = this.props.name.value;
  readonly nameVo: NameVo = this.props.name;
  readonly email: string = this.props.email;
  readonly password: string = this.props.password;

  protected constructor(props: studentEntityProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(props: CreateStudentProps): studentEntity {
    this.clearErrors();

    const nameOrError = NameVo.create(props.name);
    const email = this._verifyEmail(props.email);
    const password = this._verifyPassword(props.password);

    this.verifyCustomErrors([nameOrError]);
    this.throwErrorsIfExists();

    return new studentEntity(
      {
        name: nameOrError.value as NameVo,
        email,
        password,
      },
      UniqueEntityId.create(props.id),
    );
  }

  private static _verifyEmail(email: string = ''): string {
    const emailTrim = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailTrim)
      this.addMessageError('Por favor, insira um e-mail válido (ex: usuario@dominio.com).');

    if (!emailRegex.test(emailTrim))
      this.addMessageError('Por favor, insira um e-mail válido (ex: usuario@dominio.com).');

    return emailTrim;
  }

  private static _verifyPassword(password: string = ''): string {
    const passwordTrim = password.trim();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*=])[a-zA-Z\d!@#$%&*=]{6,}$/;

    if (!passwordTrim) this.addMessageError('Por favor, insira uma senha forte.');

    if (!passwordRegex.test(passwordTrim))
      this.addMessageError(
        'A senha deve ter o mínimo de 6 caracteres e conter letras maiúsculas e minúsculas, números e símbolos como ! @ # $ % & * =',
      );

    return passwordTrim;
  }
}
