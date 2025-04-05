import { validateUuid } from '@/main/utils/validate-uuid';
import { z } from 'zod';

const strErrormessage = (field: string) => `Por favor, insira uma string no campo ${field}`;

export const activeUserSchema = z.object({
  email: z
    .string({ message: strErrormessage('email') })
    .email({ message: 'Por favor, insira um e-mail válido (ex: usuario@dominio.com).' })
    .max(255, {
      message: 'O e-mail deve ter no máximo 255 caracteres.',
    }),
  callbackUrl: z.string({ message: strErrormessage('callbackUrl') }).url({
    message: 'Por favor, insira uma url válida.',
  }),
  id: z.string({ message: strErrormessage('id') }).refine(value => validateUuid(value), {
    message: 'Por favor, insira um id valido.',
  }),
});
