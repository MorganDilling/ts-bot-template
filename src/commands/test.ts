import Command from 'classes/Command';
import {
  SlashCommandBuilder,
  CommandInteraction,
  CacheType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';
import ExtendedClient from 'classes/ExtendedClient';

export default class Test extends Command {
  constructor(name: string) {
    super(name);
  }

  description = 'Testing dynamic CustomId buttons';

  get data(): Partial<SlashCommandBuilder> {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);
  }

  public async execute(
    client: ExtendedClient,
    interaction: CommandInteraction<CacheType>
  ): Promise<void> {
    const random = Math.random();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`testing-button-with-id-${random}`)
        .setLabel(`Testing button with id ${random}`)
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
      components: [row as any],
      content: 'Click button',
      ephemeral: true,
    });
  }
}
