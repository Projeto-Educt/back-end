import { ValueObject } from '@/main/domain';
import type { CustomError, Either } from '@/main/errors';
import { left, right } from '@/main/errors';

export class NameVo extends ValueObject {
  protected constructor(public readonly name: string) {
    super(name);
  }

  static create(name: string): Either<CustomError, NameVo> {
    this.clearErrors();

    const nameTrim = name.trim();

    this._hasName(nameTrim);
    this._isValidFormatName(nameTrim);
    this._hasCompleteName(nameTrim);

    if (this.error) return left(this.error);

    return right(new NameVo(nameTrim));
  }

  private static _hasName(name: string): void {
    if (!name) this.addMessageError('Por favor, insira seu nome completo.');
  }

  private static _isValidFormatName(name: string): void {
    if (!/^[a-zA-ZÀ-ÿ\s~-]+$/.test(name))
      this.addMessageError('O nome deve conter apenas letras, espaços e hifens.');

    if (name.length < 7) this.addMessageError('Por favor, insira seu nome completo.');

    if (name.length > 100) this.addMessageError('O nome deve ter no máximo 100 caracteres.');
  }

  private static _hasCompleteName(name: string): void {
    const nameSplit = name.split(' ');

    if (nameSplit.length < 2) this.addMessageError('Por favor, insira seu nome completo.');

    if (nameSplit.some(word => word.length < 3) && nameSplit.length > 1)
      this.addMessageError('Não use abreviações (Ex: João S. Pedro).');
  }
}
