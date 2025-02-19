import nodemailer from 'nodemailer';
import { CustomError } from '../errors';
import { formatTemplateString } from '../helpers/format-template-string';
import type { MailingContract, MailingSendProps } from './contracts/mailing.contract';

type MailingProps = {
  from: string;
  password: string;
  smtpHost: string;
  smtpPort: number;
};

export class NodeMailerAdapter implements MailingContract {
  constructor(private readonly props: MailingProps) {}

  send({ to, subject, payload, html, text }: MailingSendProps): void {
    this._validate(html, text);

    const transporter = nodemailer.createTransport({
      host: this.props.smtpHost,
      port: this.props.smtpPort,
      auth: {
        user: this.props.from,
        pass: this.props.password,
      },
    });

    transporter.sendMail({
      from: this.props.from,
      to: to,
      subject: subject,
      ...(html
        ? { html: payload ? this._formatString(html, payload) : html }
        : { text: payload ? this._formatString(text!, payload) : text }),
    });
  }

  private _formatString(text: string, payload: Record<string, any>): string {
    return formatTemplateString(text, payload);
  }

  private _validate(html?: string, text?: string): void {
    if (!html && !text) {
      throw new CustomError('Missing html or text');
    }
  }
}
