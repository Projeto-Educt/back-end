import { USER_ENV } from '@/main/config/env';
import type { HandlerContract } from '@/main/events';
import { makeMailingAdapter } from '@/main/factories';
import type { CryptographyContract } from '@/main/infra';
import type { MailingContract } from '@/main/infra/contracts/mailing.contract';
import type { RegisteredUserEvent } from '@/modules/user/events/registered-user.events';
import { makeCryptographyUserAdapter } from '@/modules/user/factories/adapter/cryptography.factory';
import { templateEmailRegisteredUser } from '@/modules/user/templates/register-user';
export class SendEmailRegisteredUserHandler implements HandlerContract<RegisteredUserEvent> {
  private readonly mailingService: MailingContract;
  private readonly templateEmail: string;
  private readonly cryptography: CryptographyContract;
  private readonly backEndUrl: string;
  constructor() {
    this.mailingService = makeMailingAdapter();
    this.templateEmail = templateEmailRegisteredUser;
    this.cryptography = makeCryptographyUserAdapter();
    this.backEndUrl = USER_ENV.backEndUrl;
  }
  handle(event: RegisteredUserEvent): void {
    const { email, callbackUrl, ...rest } = event.getPayload();

    const url = `${this.backEndUrl}/?${this.cryptography.encrypt(`${email}-${callbackUrl}`)}`;

    this.mailingService.send({
      to: email,
      subject: 'Novo usuário cadastrado',
      html: this.templateEmail,
      payload: {
        email,
        url,
        ...rest,
      },
    });
  }
}
