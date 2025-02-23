import { CustomError } from '@/main/errors';
import { NodeMailerAdapter } from '@/main/infra/nodemailer.infra';
import nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('NodeMailerAdapter', () => {
  let NodeMailer: NodeMailerAdapter;
  let sendMailMock: jest.Mock;

  beforeEach(() => {
    sendMailMock = jest.fn();

    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: sendMailMock,
    });

    NodeMailer = new NodeMailerAdapter({
      from: 'test@example.com',
      password: 'testpassword',
      smtpHost: 'smtp.example.com',
      smtpPort: 587,
    });
  });

  it('deve enviar um email com HTML', async () => {
    NodeMailer.send({
      to: 'receiver@example.com',
      subject: 'Test Email',
      html: '<h1>Olá, {{nome}}</h1>',
      payload: { nome: 'Erick' },
    });

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: 'smtp.example.com',
      port: 587,
      auth: {
        user: 'test@example.com',
        pass: 'testpassword',
      },
    });

    expect(sendMailMock).toHaveBeenCalledWith({
      from: 'test@example.com',
      to: 'receiver@example.com',
      subject: 'Test Email',
      html: '<h1>Olá, Erick</h1>',
    });
  });

  it('deve enviar um email com texto puro', async () => {
    NodeMailer.send({
      to: 'receiver@example.com',
      subject: 'Test Email',
      text: 'Olá, {{nome}}',
      payload: { nome: 'Erick' },
    });

    expect(sendMailMock).toHaveBeenCalledWith({
      from: 'test@example.com',
      to: 'receiver@example.com',
      subject: 'Test Email',
      text: 'Olá, Erick',
    });
  });

  it('deve lançar erro se nem "html" nem "text" forem fornecidos', async () => {
    try {
      NodeMailer.send({
        to: 'receiver@example.com',
        subject: 'Test Email',
        payload: {},
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).messages).toEqual(['Missing html or text', ,]);
    }
  });

  it('Should send pure html or tex if not receive payload', async () => {
    NodeMailer.send({
      to: 'receiver@example.com',
      subject: 'Test Email',
      html: '<h1>Olá, {{nome}}</h1>',
    });

    expect(sendMailMock).toHaveBeenCalledWith({
      from: 'test@example.com',
      to: 'receiver@example.com',
      subject: 'Test Email',
      html: '<h1>Olá, {{nome}}</h1>',
    });

    NodeMailer.send({
      to: 'receiver@example.com',
      subject: 'Test Email',
      text: 'Olá, {{nome}}',
    });

    expect(sendMailMock).toHaveBeenCalledWith({
      from: 'test@example.com',
      to: 'receiver@example.com',
      subject: 'Test Email',
      text: 'Olá, {{nome}}',
    });
  });
});
