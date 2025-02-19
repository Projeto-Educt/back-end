export type MailingSendProps = {
  payload?: Record<string, any>;
  to: string;
  subject: string;
  html?: string;
  text?: string;
};
export interface MailingContract {
  send(props: MailingSendProps): void;
}
