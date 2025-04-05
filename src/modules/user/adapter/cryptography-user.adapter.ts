import { CryptoAdapter } from '@/main/adapters/cryptography';
import { USER_ENV } from '@/main/config/env';

export class CryptographyUserAdapter extends CryptoAdapter {
  constructor() {
    super(USER_ENV.secretKeyCrypto);
  }
}
