import { validateUuid } from '@/main/utils/validate-uuid';
import { z } from 'zod';
import { EDUCATION_LEVEL, INTEREST_COURSES, INTEREST_UNIVERSITIES } from '../../constants';

const strErrormessage = (field: string) => `Por favor, insira uma string no campo ${field}`;

export const updateUserSchema = z
  .object({
    id: z.string({ message: strErrormessage('id') }).refine(value => validateUuid(value), {
      message: 'Por favor, insira um id valido.',
    }),
    name: z
      .string({ message: strErrormessage('name') })
      .trim()
      .min(7, { message: 'Por favor, insira seu nome completo.' })
      .max(100, { message: 'O nome deve ter no máximo 100 caracteres.' })
      .optional(),
    email: z
      .string({ message: strErrormessage('email') })
      .email({ message: 'Por favor, insira um e-mail válido (ex: usuario@dominio.com).' })
      .max(255, {
        message: 'O e-mail deve ter no máximo 255 caracteres.',
      })
      .optional(),
    educationLevel: z
      .string({ message: strErrormessage('educationLevel') })
      .refine(value => EDUCATION_LEVEL.includes(value), {
        message: `Por favor, insira um nível de ensino válido.`,
      })
      .optional(),
    interestCourse: z
      .string({ message: strErrormessage('interestCourse') })
      .refine(value => INTEREST_COURSES.includes(value), {
        message: 'Por favor, insira um curso de seu interesse',
      })
      .optional(),
    interestUniversity: z
      .string({ message: strErrormessage('interestUniversity') })
      .refine(value => INTEREST_UNIVERSITIES.includes(value), {
        message: 'Por favor, insira uma Faculdade de seu interesse',
      })
      .optional(),
  })
  .refine(
    data => {
      if (
        !data.name &&
        !data.email &&
        !data.educationLevel &&
        !data.interestUniversity &&
        !data.interestCourse
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Por favor, insira ao menos um campo para atualizar.',
    },
  );
