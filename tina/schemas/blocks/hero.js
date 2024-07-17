// ../tina/schemas/components/hero.js

import item from '../components/item';

const hero = {
  type: 'object',
  label: 'Hero',
  name: 'hero',
  fields: [
    {
      type: 'string',
      label: 'Height',
      name: 'height',
    },
    {
      type: 'string',
      label: 'Max Height',
      name: 'max_height',
    },
    {
      type: 'string',
      label: 'Min Height',
      name: 'min_height',
    },
    item
  ],
};

export default hero;
