import { makeMailingAdapter } from '@/main/factories'; // Importe a factory do mailing
import { RegisteredStudentEvent } from '@/modules/student/events/registered-student.events'; // Importe o evento
import { makeCryptographyStudentAdapter } from '@/modules/student/factories/adapter/cryptography.factory'; // Importe a factory da criptografia
import { SendEmailRegisteredStudentHandler } from '../../events/z-handlers';

jest.mock('@/main/factories', () => ({
  makeMailingAdapter: jest.fn(),
}));

jest.mock('@/modules/student/factories/adapter/cryptography.factory', () => ({
  makeCryptographyStudentAdapter: jest.fn(),
}));

jest.mock('@/main/config/env', () => ({
  STUDENT_ENV: {
    backEndUrl: 'http://test.com',
  },
}));

describe('SendEmailRegisteredStudentHandler', () => {
  let handler: SendEmailRegisteredStudentHandler;
  let mailingServiceMock: jest.Mocked<any>;
  let cryptographyMock: jest.Mocked<any>;

  beforeEach(() => {
    mailingServiceMock = { send: jest.fn() };
    (makeMailingAdapter as jest.Mock).mockReturnValue(mailingServiceMock);

    cryptographyMock = { encrypt: jest.fn() };
    (makeCryptographyStudentAdapter as jest.Mock).mockReturnValue(cryptographyMock);

    handler = new SendEmailRegisteredStudentHandler();
  });

  it('should send email with correct data', () => {
    const eventPayload = {
      name: 'Test Student',
      email: 'test@example.com',
      callbackUrl: '/confirm',
      otherData: 'some data',
    };

    const event = new RegisteredStudentEvent();
    event.setPayload(eventPayload);

    const encryptedUrl = 'encrypted-url';
    (cryptographyMock.encrypt as jest.Mock).mockReturnValue(encryptedUrl);

    handler.handle(event);

    const expectedUrl = 'http://test.com/?' + encryptedUrl;

    expect(mailingServiceMock.send).toHaveBeenCalledWith({
      to: eventPayload.email,
      subject: 'Novo aluno cadastrado',
      html: expect.any(String),
      payload: {
        email: eventPayload.email,
        url: expectedUrl,
        name: eventPayload.name,
        otherData: eventPayload.otherData,
      },
    });
  });

  it('should call cryptography with correct data', () => {
    const eventPayload = {
      name: 'Test Student',
      email: 'test@example.com',
      callbackUrl: '/confirm',
      otherData: 'some data',
    };

    const event = new RegisteredStudentEvent();
    event.setPayload(eventPayload);

    handler.handle(event);

    expect(cryptographyMock.encrypt).toHaveBeenCalledWith(
      `${eventPayload.email}-${eventPayload.callbackUrl}`,
    );
  });

  it('should not throw error if other data is not provided', () => {
    const eventPayload = {
      name: 'Test Student',
      email: 'test@example.com',
      callbackUrl: '/confirm',
    };

    const event = new RegisteredStudentEvent();
    event.setPayload(eventPayload);

    const encryptedUrl = 'encrypted-url';
    (cryptographyMock.encrypt as jest.Mock).mockReturnValue(encryptedUrl);

    expect(() => handler.handle(event)).not.toThrow();

    const expectedUrl = 'http://test.com/?' + encryptedUrl;

    expect(mailingServiceMock.send).toHaveBeenCalledWith({
      to: eventPayload.email,
      subject: 'Novo aluno cadastrado',
      html: expect.any(String),
      payload: {
        email: eventPayload.email,
        url: expectedUrl,
        name: eventPayload.name,
      },
    });
  });
});
