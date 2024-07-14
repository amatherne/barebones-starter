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
