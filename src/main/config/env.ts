import dotenv from 'dotenv';
import path from 'path';

const nodeEnv = process.env.NODE_ENV || '';

switch (nodeEnv.toLowerCase()) {
  case 'test':
    dotenv.config({ path: path.join(__dirname, '../../../.env.test') });
    break;
  case 'dev':
    dotenv.config({ path: path.join(__dirname, '../../../.env.dev') });
    break;
  default:
    dotenv.config({ path: path.join(__dirname, '../../../.env') });
}

export const env = {
  nodeEnv,
  port: process.env.PORT || 3000,
};
