export interface CryptographyContract {
  encrypt(value: string): string;
  decrypt(value: string): string;
}
