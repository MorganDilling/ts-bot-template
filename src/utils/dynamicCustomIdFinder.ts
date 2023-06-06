import Button from 'classes/Button';
import Modal from 'classes/Modal';
import { Collection } from 'discord.js';

/**
 * @param route The custom id of the button or modal. It can include dynamic parts. e.g. "support-close-[id]"
 */
export default (
  collection: Collection<string, Modal | Button>,
  route: string
): [Modal | Button | null, { [slug: string]: string }?] => {
  const exactMatch = collection.get(route);
  if (exactMatch) return [exactMatch];

  let returnItem: Modal | Button | null = null;
  let returnPathData: { [slug: string]: string } | undefined = undefined;

  collection.forEach((item: Modal | Button) => {
    if (returnItem) return;
    const customId = item.customId;
    const customIdParts = customId.split('-');
    const routeParts = route.split('-');

    if (customIdParts.length !== routeParts.length) return;

    let match = true;
    const pathData: { [slug: string]: string } = {};

    for (let i = 0; i < customIdParts.length; i++) {
      if (customIdParts[i] === routeParts[i]) continue;
      if (customIdParts[i].startsWith('[') && customIdParts[i].endsWith(']')) {
        pathData[customIdParts[i].slice(1, -1)] = routeParts[i];
        continue;
      }

      match = false;
      break;
    }

    if (match) {
      returnItem = item;
      returnPathData = pathData;
    }
  });

  return [returnItem, returnPathData];
};
