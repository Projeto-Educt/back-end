import { EventBase } from '@/main/events';

class EventTester extends EventBase<any> {
  constructor(name: string) {
    super(name);
  }
}

describe('Event', () => {
  let event: EventTester;

  beforeAll(() => {
    event = new EventTester('any_name');
  });

  it('Should create an event', () => {
    expect(event).toBeInstanceOf(EventBase);
  });

  it('Should get correct name', () => {
    expect(event.getName()).toBe('any_name');
  });

  it('Should create a date if not provided in setPayload()', () => {
    const date = new Date();
    event.setPayload({});
    expect(event.getDateTime()).toEqual(date);
  });

  it('Should create a date if provided in setPayload()', () => {
    const date = new Date('2024-11-01');
    event.setPayload({}, date);
    expect(event.getDateTime()).toEqual(date);
  });

  it('Should getPayload()', () => {
    const data = { name: 'John Doe' };
    event.setPayload(data);
    expect(event.getPayload()).toEqual(data);
  });
});
