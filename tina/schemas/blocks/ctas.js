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
      const itemText = item.text?.children?.[0]?.children?.[0]?.text || null;

      const firstItemTitle  = item.item?.[0]?.title || null;
      const firstItemText   = item.item?.[0]?.text?.children?.[0]?.children?.[0]?.text || null;

      return {
        label: itemTitle || itemText || firstItemTitle || firstItemText || 'CTA',
        thumbnail: item.src || '',
      };
    },

    defaultItem: () => ({
      published: true, 
      styles: {
        colors: 'color--1',  
      },
      widths: {
        desktop_width: 'lg-up--w-33 ',
        tablet_width: 'md--w-50 ',
        mobile_width: 'w-50 ',
      },
      // Ensure all other required fields or items are included
      ...(item.defaultItem ? item.defaultItem() : {}), // Use defaultItem if it exists
    }),
  },
  defaultItem: () => {
    return {
      published: true,
    };
  },
  fields: [
    {
      type: "boolean",
      label: "Publish",
      name: "published",
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
            { value:"color--1",           label:"Colors 1" },
            { value:"color--2",           label:"Colors 2" },
            { value:"color--3",           label:"Colors 3" },
            { value:"color--4",           label:"Colors 4" },
            { value:"color--gradient",    label:"Gradient 1" },
            { value:"color--gradient-2",  label:"Gradient 2" },
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