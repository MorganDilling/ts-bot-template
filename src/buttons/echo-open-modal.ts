import Button from 'classes/Button';
import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import ExtendedClient from 'classes/ExtendedClient';

export default class EchoDelete extends Button {
  public async execute(
    client: ExtendedClient,
    interaction: ButtonInteraction
  ): Promise<void> {
    const modal = new ModalBuilder()
      .setCustomId('echo-modal')
      .setTitle('Modal');

    const textInput = new TextInputBuilder()
      .setCustomId('echo-modal-text-input')
      .setLabel('Echo message')
      .setPlaceholder('Enter your message here')
      .setMinLength(1)
      .setMaxLength(100)
      .setStyle(TextInputStyle.Paragraph);

    const actionRow = new ActionRowBuilder().addComponents(textInput);

    modal.addComponents(actionRow as any);

    await interaction.showModal(modal);
  }
}
