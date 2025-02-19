import type { DispatcherContract, EventContract, HandlerContract } from '.';
export class EventDispatcher implements DispatcherContract {
  public handlers: Record<string, HandlerContract[]> = {};

  register(name: string, handler: HandlerContract): void {
    if (this.has(name, handler)) {
      throw new Error(`Handler already registered for ${name}`);
    }

    this.handlers[name] ? this.handlers[name].push(handler) : (this.handlers[name] = [handler]);
  }

  clear(): void {
    this.handlers = {};
  }

  has(name: string, handler: HandlerContract): boolean {
    const handlersByName = this.handlers[name] || null;
    return !!handlersByName && handlersByName.includes(handler);
  }

  dispatch(event: EventContract<any>): void {
    const handlers = this.handlers[event.getName()];

    handlers?.forEach(handler => handler.handle(event));
  }
  remove(name: string, handler: HandlerContract): void {
    const handlers = this.handlers[name] || null;
    this.handlers[name] = handlers?.filter(h => h !== handler);
  }
}
