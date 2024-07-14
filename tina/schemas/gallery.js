// ../tina/schemas/gallery.js

import link from '../schemas/link';

const gallery = {
  type: 'object',
  label: 'Gallery',
  name: 'gallery',
  list: true,
  ui: {
    itemProps: (item) => {
      const imgTitle = item.src ? item.src.substring(item.src.lastIndexOf('/') + 1) : null;
      const galleryTitle = item.title ? item.title : null;
      const altText = item.alt ? item.alt : null;

      return {
        label: galleryTitle || altText || imgTitle || 'Image',
        thumbnail: item.src || '',
      };
    },
  },
  fields: [
    {
      type: 'image',
      label: 'Image',
      name: 'src',
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
      ui: {
        itemProps: (item) => {
          const linkTitle = item.text ? item.text : null;
          return {
            label: linkTitle || 'Button',
          }
        },
      },
      fields: [
        link.fields[0], 
        link.fields[1], 
        link.fields[2], 
      ],
    },
  ],
};

export default gallery;
