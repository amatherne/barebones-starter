// ../tina/collections/global_settings.js

/**
 * @type {import('tinacms').Collection}
 */

import link from '../schemas/link';

export default {
  label: "Global Settings",
  name: "global_settings",
  path: "content/global_settings",
  format: "json",
  fields: [
    {
      type: "image",
      label: "Logo",
      name: "logo",
    },
    {
      type: "string",
      label: "Site Title",
      name: "title",
    },
    {
      type: "string",
      label: "SEO Title",
      name: "seo_title",
    },
    {
      type: "rich-text",
      label: "SEO Text",
      name: "seo_text",
    },
    {
      type: "object",
      label: "Main Menu",
      name: "main_menu",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item.text || 'Menu Item',
        }),
      },
      fields: [
        link.fields[0],
        link.fields[1],
        link.fields[2],
        {
          type: "object",
          label: "Submenu Items",
          name: "subitems",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item.text || 'SubMenu Item',
            }),
          },
          fields: [
            link.fields[0],
            link.fields[1],
            link.fields[2],
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Footer Menu",
      name: "footer_menu",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item.text || 'Menu Item',
        }),
      },
      fields: [
        link.fields[0],
        link.fields[1],
        link.fields[2],
      ],
    },
  ],
};
