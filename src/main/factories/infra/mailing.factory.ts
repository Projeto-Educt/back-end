import { EMAILS_ENV } from '@/main/config/env';
import type { MailingContract } from '@/main/infra/contracts/mailing.contract';
import { NodeMailerAdapter } from '@/main/infra/nodemailer.infra';

export const makeMailingAdapter = (): MailingContract => {
  return new NodeMailerAdapter({
    from: EMAILS_ENV.from,
    password: EMAILS_ENV.password,
    smtpHost: EMAILS_ENV.smtpHost,
    smtpPort: EMAILS_ENV.smtpPort,
  });
};
