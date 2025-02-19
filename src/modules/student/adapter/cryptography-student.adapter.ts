import { CryptoAdapter } from '@/main/adapters/cryptography';
import { STUDENT_ENV } from '@/main/config/env';

export class CryptographyStudentAdapter extends CryptoAdapter {
  constructor() {
    super(STUDENT_ENV.secretKeyCrypto);
  }
}
