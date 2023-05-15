import Command from 'classes/Command';
import {
  SlashCommandBuilder,
  CommandInteraction,
  CacheType,
  CommandInteractionOptionResolver,
} from 'discord.js';
import ExtendedClient from 'classes/ExtendedClient';

export default class Echo extends Command {
  constructor(commandName: string) {
    super(commandName);
  }

  get data(): Partial<SlashCommandBuilder> {
    return new SlashCommandBuilder()
      .setName(this.commandName)
      .setDescription('Echoes your message (example command)')
      .addStringOption((option) =>
        option
          .setName('message')
          .setDescription('The message to echo')
          .setRequired(true)
      );
  }

  public execute(
    client: ExtendedClient,
    interaction: CommandInteraction<CacheType>
  ): void {
    const message = (
      interaction.options as CommandInteractionOptionResolver<CacheType>
    ).getString('message');

    if (!message) {
      interaction.reply({
        content: '> :warning: | Please provide a message to echo',
        ephemeral: true,
      });
      return;
    }

    interaction.reply({
      content: `> :information_source: ${message}`,
      ephemeral: true,
    });
  }
}
