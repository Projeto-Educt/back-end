import dotenv from 'dotenv';
import path from 'path';

const nodeEnv = process.env.NODE_ENV || '';

switch (nodeEnv.toLowerCase()) {
  case 'test':
    dotenv.config({ path: path.join(__dirname, '../../../.env.test') });
    break;
  case 'production':
    dotenv.config({ path: path.join(__dirname, '../../../.env.prod') });
    break;
  default:
    dotenv.config({ path: path.join(__dirname, '../../../.env') });
}

export const SERVER_ENV = {
  nodeEnv,
  port: process.env.PORT || 3000,
  secretSession: process.env.SECRET_SESSION || 'secret',
  cookieSecure: process.env.COOKIE_SECURE === 'true',
  cookieMaxAge: Number(process.env.COOKIE_MAX_AGE) || 5 * 0 * 1000,
};

export const EMAILS_ENV = {
  from: process.env.SMTP_FROM || '',
  password: process.env.SMTP_PASSWORD || '',
  smtpHost: process.env.SMTP_HOST || '',
  smtpPort: Number(process.env.SMTP_PORT) || 0,
};

export const USER_ENV = {
  backEndUrl: process.env.BACK_END_URL_CONFIRM_EMAIL || '',
  secretKeyCrypto: process.env.SECRET_KEY_CRYPTO_EMAIL || '',
};

export const DATABASE_ENV = {
  dbUrl: process.env.DATABASE_URL || '',
};
