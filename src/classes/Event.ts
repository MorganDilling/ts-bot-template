import ExtendedClient from './ExtendedClient';

export default abstract class DiscordEvent {
  public static once = false;

  static get eventName(): string {
    const name = __filename.split(/[\\/]/).pop()?.split('.')[0];
    if (!name) throw new Error('Event name not found');
    return name;
  }

  public static execute(client: ExtendedClient, ...args: unknown[]): void {
    client.logger.warn(`Event ${this.eventName} is missing execute() method`);
    client.logger.info(`Event ${this.eventName} was called with args: ${args}`);
  }
}
