import Exception from './Exception';

export default class ButtonNotFoundException extends Exception {
  constructor(customId: string) {
    super(`Could not find button ${customId}`);
    this.name = 'ButtonNotFoundException';
  }
}
