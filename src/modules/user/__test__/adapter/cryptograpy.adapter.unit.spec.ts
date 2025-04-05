import { CryptographyUserAdapter } from '@/modules/user/adapter/cryptography-user.adapter';

describe('CryptoAdapter', () => {
  let cryptoAdapter: CryptographyUserAdapter;

  beforeAll(() => {
    cryptoAdapter = new CryptographyUserAdapter();
  });
  it('Should encrypt and decrypt', () => {
    const text = 'Text to encrypt';

    const encrypted = cryptoAdapter.encrypt(text);
    expect(encrypted).not.toBe(text);

    const decrypted = cryptoAdapter.decrypt(encrypted);
    expect(decrypted).toBe(text);
  });

  it('Must ensure that encryption is deterministic only with identical data and secret key', () => {
    const text = 'Text to encrypt';

    const encrypted1 = cryptoAdapter.encrypt(text);
    const encrypted2 = cryptoAdapter.encrypt(text);

    expect(encrypted1).not.toBe(encrypted2);
  });

  it('Should fail to decrypt with tampered data', () => {
    const text = 'Text to encrypt';
    const encrypted = cryptoAdapter.encrypt(text);

    const tamperedEncrypted = encrypted.replace('a', 'b');

    expect(() => cryptoAdapter.decrypt(tamperedEncrypted)).toThrow();
  });
});
