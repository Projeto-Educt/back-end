type Props = Record<string, any>;
export interface EventContract<P extends Props = Props> {
  getName(): string;
  getDateTime(): Date;
  getPayload(): P;
  setPayload(payload: P, date?: Date): void;
}
