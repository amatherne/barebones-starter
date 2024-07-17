// ../tina/schemas/components/item.js

import React from 'react';
import link from './link';
import { useCMS } from '@tinacms/react-core';


const item = {
  type: 'object',
  label: 'Gallery',
  name: 'item',
  list: true,
  ui: {
    itemProps: (item) => {
      const imgTitle = item.src ? item.src.substring(item.src.lastIndexOf('/') + 1) : null;
      const itemTitle = item.title ? item.title : null;
      const altText = item.alt ? item.alt : null;

      return {
        label: itemTitle || altText || imgTitle || 'Image',
        thumbnail: item.src || '',
      };
    },
  },
  fields: [
    {
      label: 'Image',
      name: 'src',
      component: 'image',
      type: 'image',
      ui: {
        parse(media) {
          if (media.filename) {
            const newFilename = media.filename.replace(/\s+/g, '-'); 
            return {
              ...media,
              filename: newFilename,
            };
          }
          return media;
        },
      },
    },
    {
      type: 'string',
      label: 'Alt Text',
      name: 'alt',
    },
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'rich-text',
      label: 'Text',
      name: 'text',
    },
    {
      type: 'object',
      label: 'Button',
      name: 'button',
      fields: link.fields,
    },
    {
      type: 'string',
      label: 'Custom CSS',
      name: 'custom_css',
      component: 'textarea'
    },
  ],
};

export default item;
