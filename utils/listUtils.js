// ../utils/listUtils.js

import { useCMS } from 'tinacms';

/**
 * Moves an item with the specified id to the end of the list.
 * @param {Array} items - The current list of items.
 * @param {number|string} id - The id of the item to move.
 */
export const moveItemToEnd = (items, id) => {
  const cms = useCMS();

  const itemIndex = items.findIndex(item => item.id === id);
  if (itemIndex !== -1) {
    const itemToMove = items.splice(itemIndex, 1)[0];
    const updatedItems = [...items, itemToMove];
    // Optionally, update TinaCMS collection or persist changes
    cms.alerts.info(`Moved item ${id} to the end.`);
    // Optionally, persist changes to TinaCMS collection
    // cms.api.persist()

    return updatedItems;
  }

  return items;
};
