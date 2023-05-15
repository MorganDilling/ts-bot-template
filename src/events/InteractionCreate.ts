import DiscordEvent from 'classes/Event';
import ExtendedClient from 'classes/ExtendedClient';
import { Interaction } from 'discord.js';
import CommandNotFoundException from 'exceptions/CommandNotFoundException';
import Exception from 'exceptions/Exception';

export default class InteractionCreate extends DiscordEvent {
  public static once = false;

  public static execute(
    client: ExtendedClient,
    interaction: Interaction
  ): void {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) throw new CommandNotFoundException(interaction.commandName);

      try {
        command.execute(client, interaction);
      } catch (error) {
        const exception = error as Exception;
        client.logger.error(error);
        interaction.reply({
          content: `> :warning: ${exception.name} ${exception.message}`,
          ephemeral: true,
        });
      }
    }
  }
}
