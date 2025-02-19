import { NodeMailerAdapter } from '@/main/adapters/nodemailer.adapter';
import { SMTP_ENV } from '@/main/config/env';
import type { MailingContract } from '@/main/infra/contracts/mailing.contract';

export const makeMailingAdapter = (): MailingContract => {
  return new NodeMailerAdapter({
    from: SMTP_ENV.from,
    password: SMTP_ENV.password,
    smtpHost: SMTP_ENV.smtpHost,
    smtpPort: SMTP_ENV.smtpPort,
  });
};
