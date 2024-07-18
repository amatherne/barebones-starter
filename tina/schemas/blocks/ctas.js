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
  // defaultItem: () => {
  //   console.log("Setting default item values"); // Check if this is logged
  //   return {
  //     widths: {
  //       desktop_width: "lg-up--w-100",
  //       tablet_width: "md--w-100",
  //       mobile_width: "w-100",
  //     },
  //     title: 'Default Title', // Add a simple default title for testing
  //   };
  // },
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
    widths,
    {
      type: 'object',
      label: 'Styles',
      name: 'styles',
      fields: [
        {
          type: "string",
          component: 'select',
          label: "Section Style",
          name: "style",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item.label || 'Style',
            }),
          },
          options: [
            { value:"",         label:"Default" },
            { value:"inline",   label:"Inline" },
          ]
        },
        {
          type: "string",
          component: 'select',
          label: "Section Colors",
          name: "colors",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item.label || 'Style',
            }),
          },
          options: [
            { value:"",                   label:"Colors 1" },
            { value:"color--2",           label:"Colors 2" },
            { value:"color--gradient",    label:"Gradient BG" },
          ]
        },

      ],
    },
    item,
    {
      type: 'string',
      label: 'Custom CSS',
      name: 'custom_css',
      component: 'textarea'
    },
  ],
};

export default PageBlocksCtas;