import Button from 'classes/Button';
import { ButtonInteraction } from 'discord.js';
import ExtendedClient from 'classes/ExtendedClient';

export default class TestingButtonWithId extends Button {
  public async execute(
    client: ExtendedClient,
    interaction: ButtonInteraction,
    pathData: { id: string }
  ): Promise<void> {
    await interaction.reply({
      content: `> ${pathData.id}`,
      ephemeral: true,
    });
  }
}
