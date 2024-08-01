// ../tina/schemas/components/item.js

import React from 'react';
import link from './link';
import opacity from './opacity';
import alignment from './alignment';

const item = {
  type: 'object',
  label: 'Item',
  name: 'item',
  list: true,
  ui: {
    itemProps: (item) => {
      const imgTitle = item.src ? item.src.substring(item.src.lastIndexOf('/') + 1) : null;
      const itemTitle = item.title ? item.title : null;
      const itemText = item.text?.children?.[0]?.children?.[0]?.text || null;
      const altText = item.alt ? item.alt : null;

      return {
        label: itemTitle || itemText || altText || imgTitle || 'Item',
        thumbnail: item.src || '',
      };
    },
    defaultItem: () => ({
      styles: {
        mobile_colors: 'color--1',  
        mobile_opacity: 0.01,  
        desktop_colors: 'color--gradient',  
        desktop_opacity: 0.85,  
      },
      button: {
        mobile_button: 'sm--button--primary',
        desktop_button: 'md-up--button--primary',
      },
      // Ensure all other required fields or items are included
      ...(item.defaultItem ? item.defaultItem() : {}), // Use defaultItem if it exists
    }),
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
      type: 'object',
      label: 'Styles',
      name: 'styles',
      fields: [
        {
          ...opacity, 
          label: 'Desktop Opacity', 
          name: 'desktop_opacity', 
        },
        {
          type: "string",
          component: 'select',
          label: "Desktop Colors",
          name: "desktop_colors",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item.label || 'Style',
            }),
          },
          options: [
            { value:"md-up--color--1",            label:"Colors 1" },
            { value:"md-up--color--2",            label:"Colors 2" },
            { value:"md-up--color--3",            label:"Colors 3" },
            { value:"md-up--color--4",            label:"Colors 4" },
            { value:"md-up--color--gradient",     label:"Gradient 1" },
            { value:"md-up--color--gradient-2",   label:"Gradient 2" },
          ]
        },
        {
          ...opacity, 
          label: 'Mobile Opacity', 
          name: 'mobile_opacity', 
        },
        {
          type: "string",
          component: 'select',
          label: "Mobile Colors",
          name: "mobile_colors",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item.label || 'Style',
            }),
          },
          options: [
            { value:"sm--color--1",           label:"Colors 1" },
            { value:"sm--color--2",           label:"Colors 2" },
            { value:"sm--color--3",           label:"Colors 3" },
            { value:"sm--color--4",           label:"Colors 4" },
            { value:"sm--color--gradient",    label:"Gradient 1" },
            { value:"sm--color--gradient-2",  label:"Gradient 2" },
          ]
        },
        {
          type: 'string',
          label: 'Custom CSS',
          name: 'custom_css',
          component: 'textarea'
        },
      ],
    },
  ],
};

export default item;
