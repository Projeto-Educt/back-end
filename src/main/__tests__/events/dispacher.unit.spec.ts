import type { EventContract, HandlerContract } from '@/main/events';
import { EventDispatcher } from '@/main/events';

const makeEventStub = ({ name, payload }: { name: string; payload: Record<string, any> }) => {
  class EventStub implements EventContract {
    constructor(
      private name: string,
      private payload: Record<string, any>,
    ) {}

    getDateTime(): Date {
      return new Date(2024, 11, 1);
    }
    getPayload(): Record<string, any> {
      return this.payload;
    }
    getName(): string {
      return this.name;
    }
    setPayload(payload: Record<string, any>): void {
      this.payload = payload;
    }
  }

  return new EventStub(name, payload);
};

const makeHandlerStub = () => {
  class HandlerStub implements HandlerContract {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async handle(event: EventContract): Promise<void> {}
  }

  return new HandlerStub();
};

const makeDatasStub = () => {
  return {
    event1: makeEventStub({ name: 'event1', payload: { event: 'event1' } }),
    event2: makeEventStub({ name: 'event2', payload: { event: 'event2' } }),
    handle1: makeHandlerStub(),
    handle2: makeHandlerStub(),
    handle3: makeHandlerStub(),
    EventDispatcher: new EventDispatcher(),
  };
};

describe('EventDispatcher', () => {
  it('Should register a handler', () => {
    const { EventDispatcher, event1, handle1 } = makeDatasStub();

    EventDispatcher.register(event1.getName(), handle1);
    expect(EventDispatcher.handlers[event1.getName()]).toHaveLength(1);
    expect(EventDispatcher.handlers[event1.getName()]).toStrictEqual([handle1]);
  });

  it('Should return error if handler already registered', async () => {
    const { EventDispatcher, event1, handle1 } = makeDatasStub();
    EventDispatcher.register(event1.getName(), handle1);

    expect(EventDispatcher.handlers[event1.getName()]).toHaveLength(1);
    expect(EventDispatcher.handlers[event1.getName()]).toStrictEqual([handle1]);

    expect(() => EventDispatcher.register(event1.getName(), handle1)).toThrow(
      new Error('Handler already registered for event1'),
    );
  });

  it('Should clear all handlers', () => {
    const { EventDispatcher, event1, handle1, handle2 } = makeDatasStub();
    EventDispatcher.register(event1.getName(), handle1);
    EventDispatcher.register(event1.getName(), handle2);
    expect(EventDispatcher.handlers[event1.getName()]).toHaveLength(2);
    expect(EventDispatcher.handlers[event1.getName()]).toStrictEqual([handle1, handle2]);
    EventDispatcher.clear();
    expect(EventDispatcher.handlers).toStrictEqual({});
  });

  it('Should has a handler', () => {
    const { EventDispatcher, event1, handle1, handle2, handle3 } = makeDatasStub();
    EventDispatcher.register(event1.getName(), handle1);
    EventDispatcher.register(event1.getName(), handle2);

    expect(EventDispatcher.has(event1.getName(), handle1)).toBeTruthy();
    expect(EventDispatcher.has(event1.getName(), handle2)).toBeTruthy();
    expect(EventDispatcher.has(event1.getName(), handle3)).toBeFalsy();
  });

  it('Should  dispatch an event', async () => {
    const { EventDispatcher, event1, handle1, handle2 } = makeDatasStub();
    const handleSpy1 = jest.spyOn(handle1, 'handle');
    const handleSpy2 = jest.spyOn(handle2, 'handle');
    EventDispatcher.register(event1.getName(), handle1);
    EventDispatcher.register(event1.getName(), handle2);
    EventDispatcher.dispatch(event1);
    expect(handleSpy1).toHaveBeenCalledTimes(1);
    expect(handleSpy2).toHaveBeenCalledTimes(1);
  });

  it('Should remove a handler', () => {
    const { EventDispatcher, event1, handle1, handle2 } = makeDatasStub();

    EventDispatcher.register(event1.getName(), handle1);
    EventDispatcher.register(event1.getName(), handle2);
    expect(EventDispatcher.handlers[event1.getName()]).toHaveLength(2);
    expect(EventDispatcher.handlers[event1.getName()]).toStrictEqual([handle1, handle2]);

    EventDispatcher.remove(event1.getName(), handle1);
    expect(EventDispatcher.handlers[event1.getName()]).toHaveLength(1);
    expect(EventDispatcher.handlers[event1.getName()]).toStrictEqual([handle2]);
  });
});
