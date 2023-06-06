import { ModalSubmitInteraction } from 'discord.js';
import ExtendedClient from 'classes/ExtendedClient';
import Modal from 'classes/Modal';

export default class EchoModal extends Modal {
  public execute(
    client: ExtendedClient,
    interaction: ModalSubmitInteraction
  ): void {
    interaction.reply({
      content: `> :information_source: Modal response: ${interaction.fields.getTextInputValue(
        'echo-modal-text-input'
      )}`,
      ephemeral: true,
    });
  }
}
