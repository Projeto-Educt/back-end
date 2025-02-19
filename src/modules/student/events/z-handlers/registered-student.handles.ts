import { STUDENT_ENV } from '@/main/config/env';
import type { HandlerContract } from '@/main/events';
import { makeMailingAdapter } from '@/main/factories';
import type { CryptographyContract } from '@/main/infra';
import type { MailingContract } from '@/main/infra/contracts/mailing.contract';
import type { RegisteredStudentEvent } from '@/modules/student/events/registered-student.events';
import { makeCryptographyStudentAdapter } from '@/modules/student/factories/adapter/cryptography.factory';
import { templateEmailRegisteredStudent } from '@/modules/student/templates/register-student';
export class SendEmailRegisteredStudentHandler implements HandlerContract<RegisteredStudentEvent> {
  private readonly mailingService: MailingContract;
  private readonly templateEmail: string;
  private readonly cryptography: CryptographyContract;
  private readonly backEndUrl: string;
  constructor() {
    this.mailingService = makeMailingAdapter();
    this.templateEmail = templateEmailRegisteredStudent;
    this.cryptography = makeCryptographyStudentAdapter();
    this.backEndUrl = STUDENT_ENV.backEndUrl;
  }
  handle(event: RegisteredStudentEvent): void {
    const { email, callbackUrl, ...rest } = event.getPayload();

    const url = `${this.backEndUrl}/?${this.cryptography.encrypt(`${email}-${callbackUrl}`)}`;

    this.mailingService.send({
      to: email,
      subject: 'Novo aluno cadastrado',
      html: this.templateEmail,
      payload: {
        email,
        url,
        ...rest,
      },
    });
  }
}
