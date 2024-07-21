// ../tina/schemas/blocks/hero.js

import React from 'react';
import item from '../components/item';

const PageBlocksHero = {
  type: 'object',
  label: 'Hero',
  name: 'hero',
  ui: {
    itemProps: (item) => {
      // const itemTitle = item.title ? item.title : null;

      const itemTitle  = item.item?.[0]?.title || null;
      const itemText   = item.item?.[0]?.text?.children?.[0]?.children?.[0]?.text || null;

      return {
        label: itemTitle || itemText || 'Hero',
        thumbnail: item.src || '',
      };
    },

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