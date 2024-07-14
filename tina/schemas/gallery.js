// ../tina/schemas/gallery.js

import link from '../schemas/link';
import { MediaUploadFieldPlugin } from '@tinacms/fields';
import { FormBuilderPlugin } from '@tinacms/form-builder';
import { GlobalStylesheet } from '@tinacms/styles';
import { IconPlugin } from '@tinacms/icons';
import { useCMS } from '@tinacms/react-core';


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
  plugins: [
    MediaUploadFieldPlugin,
    FormBuilderPlugin,
    GlobalStylesheet,
    IconPlugin,
  ],
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
      // ui: {
      //   itemProps: (item) => {
      //     const buttonTitle = item.text || 'Button text';
      //     console.log('Button itemProps:', item);
      //     return {
      //       label: buttonTitle,
      //     };
      //   },
      // },
    },
  ],
};

export default gallery;
