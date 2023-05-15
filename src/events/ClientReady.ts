import Event from 'classes/Event';
import ExtendedClient from 'classes/ExtendedClient';
import { globSync } from 'glob';
import { REST, Routes } from 'discord.js';

import { token } from '../../config.json';

const rest = new REST({ version: '10' }).setToken(token);

export default class ClientReady extends Event {
  public static once = true;

  public static async execute(client: ExtendedClient): Promise<void> {
    client.logger.info(`Logged in as ${client.user?.tag}`);

    const commands = globSync('./src/commands/**/*.ts');

    for (const command of commands) {
      const cmd = new (require(`../../${command}`).default)(
        command.split(/[\\/]/).pop()?.split('.')[0]
      );

      client.logger.info(`Loaded command ${cmd.commandName}`);

      client.commands.set(cmd.commandName, cmd);
    }

    const id = client.user?.id;

    if (!id) throw new Error('Client ID not found');

    const commandData = client.commands.map((command) => command.data);

    client.logger.info(`Registering ${commandData.length} command(s)`);
    try {
      await rest.put(Routes.applicationCommands(id), {
        body: commandData,
      });
      client.logger.info('Successfully registered commands');
    } catch (error) {
      client.logger.error(error);
    }
  }
}
