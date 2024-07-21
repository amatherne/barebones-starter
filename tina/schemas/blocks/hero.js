// ../tina/schemas/blocks/hero.js

import React from 'react';
import item from '../components/item';

const PageBlocksHero = {
  type: 'object',
  label: 'Hero',
  name: 'hero',
  ui: {
    defaultItem: () => ({
      published: true, 
      styles: {
        height: '56%',       
        max_height: '',      
        min_height: '',
      },
      // Ensure all other required fields or items are included
      ...(item.defaultItem ? item.defaultItem() : {}), // Use defaultItem if it exists
    }),
  },
  fields: [
    {
      type: "boolean",
      label: "Publish",
      name: "published",
    },
    item,
    {
      type: 'object',
      label: 'Styles',
      name: 'styles',
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
      ],
    },
  ],
};

export default PageBlocksHero;