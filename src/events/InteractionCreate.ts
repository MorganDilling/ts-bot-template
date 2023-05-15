import DiscordEvent from 'classes/Event';
import ExtendedClient from 'classes/ExtendedClient';
import { Interaction } from 'discord.js';

export default class InteractionCreate extends DiscordEvent {
  public static once = false;

  public static execute(
    client: ExtendedClient,
    interaction: Interaction
  ): void {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        command.execute(client, interaction);
      } catch (error) {
        client.logger.error(error);
        interaction.reply({
          content:
            '> :warning: | An error occured while executing this command',
          ephemeral: true,
        });
      }
    }
  }
}
