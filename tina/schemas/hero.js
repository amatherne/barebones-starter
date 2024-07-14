// ../tina/schemas/gallery.js

import gallery from '../schemas/gallery';

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
    gallery
  ],
};

export default hero;
