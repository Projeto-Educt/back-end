import type { EventContract } from './contracts/event.contract';

type Props = Record<string, any>;

export abstract class EventBase<P extends Props> implements EventContract<P> {
  private payload: P = {} as P;
  private dateTime: Date | null = null;

  protected constructor(private readonly name: string) {}
  getName(): string {
    return this.name;
  }
  getDateTime(): Date {
    return this.dateTime!;
  }
  getPayload(): P {
    return this.payload;
  }
  setPayload(payload: P, date?: Date): void {
    this.dateTime = date ?? new Date();
    this.payload = {
      ...payload,
    };
  }
}
