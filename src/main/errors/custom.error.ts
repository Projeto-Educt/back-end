export class CustomError {
  messages: string[];
  constructor(private readonly message: string[] | string) {
    this.messages = Array.isArray(message) ? message : [message];
  }
}
