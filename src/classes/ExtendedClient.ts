import { Client, ClientOptions, Collection } from 'discord.js';
import Command from './Command';
import Logger from './Logger';

export default class ExtendedClient extends Client {
  public logger: Logger;
  public commands: Collection<string, Command>;

  constructor(options: ClientOptions) {
    super(options);

    this.logger = new Logger();
    this.commands = new Collection();
  }
}
