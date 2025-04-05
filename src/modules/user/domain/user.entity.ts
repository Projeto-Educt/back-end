import { Entity, UniqueEntityId } from '@/main/domain';
import { EDUCATION_LEVEL, INTEREST_COURSES, INTEREST_UNIVERSITIES } from '@/modules/user/constants';
import { NameVo } from './value-objects/name.vo';

export type userEntityProps = {
  id?: UniqueEntityId;
  name: NameVo;
  email: string;
  password: string;
  isActive: boolean;
  interestCourse?: string;
  interestUniversity?: string;
  educationLevel?: string;
};

export type CreateUserProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  interestCourse?: string;
  interestUniversity?: string;
  educationLevel?: string;
};

export type UpdateUserProps = Partial<Omit<CreateUserProps, 'id'>>;

export class UserEntity extends Entity<userEntityProps> {
  name: string = this.props.name.value;
  email: string = this.props.email;
  password: string = this.props.password;
  isActive: boolean = this.props.isActive;
  interestCourse?: string = this.props.interestCourse;
  interestUniversity?: string = this.props.interestUniversity;
  educationLevel?: string = this.props.educationLevel;

  protected constructor(props: userEntityProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(props: CreateUserProps): UserEntity {
    this.clearErrors();

    props.isActive = props.isActive || false;

    this._educationLevel(props.educationLevel);
    this._interestCourse(props.interestCourse);
    this._interestUniversity(props.interestUniversity);

    const nameOrError = NameVo.create(props.name);
    const email = this._validateEmail(props.email);
    const password = this._verifyPassword(props.password);

    this.verifyCustomErrors([nameOrError]);
    this.throwErrorsIfExists();

    return new UserEntity(
      {
        name: nameOrError.value as NameVo,
        email,
        password,
        isActive: props.id ? props.isActive : false,
        interestCourse: props.interestCourse,
        interestUniversity: props.interestUniversity,
        educationLevel: props.educationLevel,
      },
      UniqueEntityId.create(props.id),
    );
  }

  private static _validateEmail(email: string = ''): string {
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

  private static _educationLevel(educationLevel?: string): void {
    if (educationLevel && !EDUCATION_LEVEL.includes(educationLevel))
      this.addMessageError('Por favor, insira um nível de ensino válido');
  }

  private static _interestCourse(interestCourse?: string): void {
    if (interestCourse && !INTEREST_COURSES.includes(interestCourse))
      this.addMessageError('Por favor, insira um curso de seu interesse');
  }

  private static _interestUniversity(interestUniversity?: string): void {
    if (interestUniversity && !INTEREST_UNIVERSITIES.includes(interestUniversity))
      this.addMessageError('Por favor, insira uma Faculdade de seu interesse');
  }

  public activate() {
    this.isActive = true;
    this.props.isActive = true;
  }

  public deactivate() {
    this.isActive = false;
    this.props.isActive = false;
  }
}
