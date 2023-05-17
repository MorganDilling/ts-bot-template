import { Client, ClientOptions, Collection } from 'discord.js';
import Command from './Command';
import Button from './Button';
import Logger from './Logger';
import Modal from './Modal';

export default class ExtendedClient extends Client {
  public logger: Logger;
  public commands: Collection<string, Command>;
  public buttons: Collection<string, Button>;
  public modals: Collection<string, Modal>;

  constructor(options: ClientOptions) {
    super(options);

    this.logger = new Logger();
    this.commands = new Collection();
    this.buttons = new Collection();
    this.modals = new Collection();
  }
}
