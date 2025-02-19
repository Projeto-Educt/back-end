import { CryptoAdapter } from '@/main/adapters/cryptography';
import crypto from 'crypto';

const MOCK_CRYPTO_SECRET_KEY = crypto.randomBytes(16);

let cryptoAdapter: CryptoAdapter;

class MockEncryption extends CryptoAdapter {
  constructor(cryptoSecretKey: string) {
    super(cryptoSecretKey);
  }
}

beforeEach(() => {
  cryptoAdapter = new MockEncryption(MOCK_CRYPTO_SECRET_KEY.toString('hex'));
});

describe('CryptoAdapter', () => {
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

  it('Should fail to decrypt with wrong key', () => {
    const text = 'Text to encrypt';
    const encrypted = cryptoAdapter.encrypt(text);

    const decryptionAdapterWithWrongKey = new MockEncryption(
      crypto.randomBytes(16).toString('hex'),
    );

    expect(() => decryptionAdapterWithWrongKey.decrypt(encrypted)).toThrow();
  });

  it('Should fail to decrypt with tampered data', () => {
    const text = 'Text to encrypt';
    const encrypted = cryptoAdapter.encrypt(text);

    const tamperedEncrypted = encrypted.replace('a', 'b');

    expect(() => cryptoAdapter.decrypt(tamperedEncrypted)).toThrow();
  });
});
