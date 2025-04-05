import type { CryptographyContract } from '@/main/infra';
import { CryptographyUserAdapter } from '@/modules/user/adapter/cryptography-user.adapter';

export const makeCryptographyUserAdapter = (): CryptographyContract => {
  return new CryptographyUserAdapter();
};
