import type { CryptographyContract } from '@/main/infra';
import { CryptographyStudentAdapter } from '../../adapter/cryptography-student.adapter';

export const makeCryptographyStudentAdapter = (): CryptographyContract => {
  return new CryptographyStudentAdapter();
};
