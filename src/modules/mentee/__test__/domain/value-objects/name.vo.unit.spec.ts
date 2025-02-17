import { CustomError } from '@/main/errors';
import { NameVo } from '@/modules/mentee/domain/value-objects/name.vo';

describe('NameVo', () => {
  it('should return all erros', () => {
    const arrange = [
      {
        value: '  ',
        message: [
          'Por favor, insira seu nome completo.',
          'O nome deve conter apenas letras, espaços e hifens.',
        ],
      },
      {
        value: '',
        message: [
          'Por favor, insira seu nome completo.',
          'O nome deve conter apenas letras, espaços e hifens.',
        ],
      },
      { value: 'abc', message: ['Por favor, insira seu nome completo.'] },
      {
        value: 'abc 12',
        message: [
          'O nome deve conter apenas letras, espaços e hifens.',
          'Por favor, insira seu nome completo.',
          'Não use abreviações (Ex: João S. Pedro).',
        ],
      },
      {
        value: 'abc .',
        message: [
          'O nome deve conter apenas letras, espaços e hifens.',
          'Por favor, insira seu nome completo.',
          'Não use abreviações (Ex: João S. Pedro).',
        ],
      },
      { value: 'abc abc'.repeat(100), message: ['O nome deve ter no máximo 100 caracteres.'] },
      {
        value: 'abc sr',
        message: [
          'Por favor, insira seu nome completo.',
          'Não use abreviações (Ex: João S. Pedro).',
        ],
      },
      { value: 'abc'.repeat(10), message: ['Por favor, insira seu nome completo.'] },
    ];

    for (const element of arrange) {
      const vo = NameVo.create(element.value);

      expect(vo.isLeft()).toBe(true);
      expect(vo.value).toBeInstanceOf(CustomError);
      expect((vo.value as CustomError).messages).toEqual(element.message);
    }
  });

  it('should return success', () => {
    const nameWithExtraSpaces = '  John Doe  ';
    const vo = NameVo.create(nameWithExtraSpaces);

    expect(vo.isRight()).toBe(true);
    expect(vo.value).toBeInstanceOf(NameVo);
    expect((vo.value as NameVo).value).toBe(nameWithExtraSpaces.trim());
  });
});
