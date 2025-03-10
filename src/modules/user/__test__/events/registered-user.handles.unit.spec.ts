import { makeMailingAdapter } from '@/main/factories';
import { RegisteredUserEvent } from '@/modules/user/events';
import { SendEmailRegisteredUserHandler } from '@/modules/user/events/handlers';
import { makeCryptographyUserAdapter } from '@/modules/user/factories/adapter/cryptography.factory';

jest.mock('@/main/factories', () => ({
  makeMailingAdapter: jest.fn(),
}));

jest.mock('@/modules/user/factories/adapter/cryptography.factory', () => ({
  makeCryptographyUserAdapter: jest.fn(),
}));

jest.mock('@/main/config/env', () => ({
  USER_ENV: {
    backEndUrl: 'http://test.com',
  },
}));

describe('SendEmailRegisteredUserHandler', () => {
  let handler: SendEmailRegisteredUserHandler;
  let mailingServiceMock: jest.Mocked<any>;
  let cryptographyMock: jest.Mocked<any>;

  beforeEach(() => {
    mailingServiceMock = { send: jest.fn() };
    (makeMailingAdapter as jest.Mock).mockReturnValue(mailingServiceMock);

    cryptographyMock = { encrypt: jest.fn() };
    (makeCryptographyUserAdapter as jest.Mock).mockReturnValue(cryptographyMock);

    handler = new SendEmailRegisteredUserHandler();
  });

  it('should send email with correct data', () => {
    const eventPayload = {
      name: 'Test User',
      email: 'test@example.com',
      callbackUrl: '/confirm',
      otherData: 'some data',
    };

    const event = new RegisteredUserEvent();
    event.setPayload(eventPayload);

    const encryptedUrl = 'encrypted-url';
    (cryptographyMock.encrypt as jest.Mock).mockReturnValue(encryptedUrl);

    handler.handle(event);

    const expectedUrl = 'http://test.com/?' + encryptedUrl;

    expect(mailingServiceMock.send).toHaveBeenCalledWith({
      to: eventPayload.email,
      subject: 'Novo usuário cadastrado',
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
      name: 'Test User',
      email: 'test@example.com',
      callbackUrl: '/confirm',
      otherData: 'some data',
    };

    const event = new RegisteredUserEvent();
    event.setPayload(eventPayload);

    handler.handle(event);

    expect(cryptographyMock.encrypt).toHaveBeenCalledWith(
      `${eventPayload.email}-${eventPayload.callbackUrl}`,
    );
  });

  it('should not throw error if other data is not provided', () => {
    const eventPayload = {
      name: 'Test User',
      email: 'test@example.com',
      callbackUrl: '/confirm',
    };

    const event = new RegisteredUserEvent();
    event.setPayload(eventPayload);

    const encryptedUrl = 'encrypted-url';
    (cryptographyMock.encrypt as jest.Mock).mockReturnValue(encryptedUrl);

    expect(() => handler.handle(event)).not.toThrow();

    const expectedUrl = 'http://test.com/?' + encryptedUrl;

    expect(mailingServiceMock.send).toHaveBeenCalledWith({
      to: eventPayload.email,
      subject: 'Novo usuário cadastrado',
      html: expect.any(String),
      payload: {
        email: eventPayload.email,
        url: expectedUrl,
        name: eventPayload.name,
      },
    });
  });
});
