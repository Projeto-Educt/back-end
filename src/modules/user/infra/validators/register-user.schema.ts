import { z } from 'zod';

const password = {
  regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*=])[a-zA-Z\d!@#$%&*=]{6,}$/,
  message(field: string): string {
    return `O campo '${field}' deve ter o mínimo de 6 caracteres e conter letras maiúsculas e minúsculas, números e símbolos como ! @ # $ % & * =`;
  },
};

const strErrormessage = (field: string) => `Por favor, insira uma string no campo ${field}`;

export const registerUserSchema = z
  .object({
    name: z
      .string({ message: strErrormessage('name') })
      .trim()
      .min(7, { message: 'Por favor, insira seu nome completo.' })
      .max(100, { message: 'O nome deve ter no máximo 100 caracteres.' }),
    email: z
      .string({ message: strErrormessage('email') })
      .email({ message: 'Por favor, insira um e-mail válido (ex: usuario@dominio.com).' })
      .max(255, {
        message: 'O e-mail deve ter no máximo 255 caracteres.',
      }),
    password: z
      .string({ message: strErrormessage('password') })
      .min(6, { message: 'Por favor, insira uma senha forte.' })
      .regex(password.regex, {
        message: password.message('senha'),
      }),

    confirmPassword: z
      .string({ message: strErrormessage('confirmPassword') })
      .min(6, { message: 'Por favor, confirme sua senha.' })
      .regex(password.regex, {
        message: password.message('confirmar senha'),
      }),
    callbackUrl: z.string({ message: strErrormessage('callbackUrl') }).url({
      message: 'Por favor, insira uma url válida.',
    }),
  })
  .refine(data => data.password === data.password, {
    message: 'As senhas não coincidem.',
  });
