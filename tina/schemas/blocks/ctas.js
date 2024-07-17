// ../tina/schemas/blocks/ctas.js

import item from '../components/item';
import link from '../components/link';
import widths from '../components/widths';

const PageBlocksCtas = {
  type: 'object',
  label: 'CTAs',
  name: 'ctas',
  ui: {
    itemProps: (item) => {
      const itemTitle = item.title ? item.title : null;

      return {
        label: itemTitle || 'CTA',
        thumbnail: item.src || '',
      };
    },
  },
  fields: [
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
    item,
    widths,
    {
      type: 'string',
      label: 'Custom CSS',
      name: 'custom_css',
      component: 'textarea'
    },
  ],
};

export default PageBlocksCtas;