import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

import ExtendedClient from './ExtendedClient';

export default abstract class Command {
  public commandName: string;
  constructor(commandName: string) {
    this.commandName = commandName;
  }

  get data(): SlashCommandBuilder {
    return new SlashCommandBuilder()
      .setName(this.commandName)
      .setDescription(`Undefined command ${this.commandName}`);
  }

  public execute(
    client: ExtendedClient,
    interaction: CommandInteraction
  ): void {
    client.logger.warn(
      `Command ${this.commandName} is missing execute() method`
    );
    client.logger.info(interaction);
    interaction.reply({
      content: `> :warning: Command \`${this.commandName}\` is missing execute() method `,
      ephemeral: true,
    });
  }
}
