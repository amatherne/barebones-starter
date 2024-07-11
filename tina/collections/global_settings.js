// ../tina/collections/global_settings.js

import TinaContentFields from '../../components/customTinaCMS/TinaContentFields';

/**
 * @type {import('tinacms').Collection}
 */
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
        itemProps: (item) => {
          return {
            label: item.label || 'Menu Item',
          };
        },
      },
      fields: [
        {
          type: "string",
          label: "Label",
          name: "label",
          required: true,
        },
        {
          type: "string",
          label: "URL",
          name: "url",
          required: true,
        },
        // {
        //   type: "object",
        //   label: "Content Link",
        //   name: "contentLink",
        //   component: "custom",
        //   render: () => <TinaContentFields />,
        // },
        {
          type: "object",
          label: "Content Link",
          name: "contentLink",
          fields: [
            {
              type: "string", // Ensure a valid type here
              label: "MDX File",
              name: "mdxFile",
              component: "text",
              description: "Choose an MDX file for this menu item.",
            },
          ],
        },
        {
          type: "object",
          label: "Submenu Items",
          name: "subitems",
          list: true,
          ui: {
            itemProps: (item) => {
              return {
                label: item.label || 'SubMenu Item',
              };
            },
          },
          fields: [
            {
              type: "string",
              label: "Label",
              name: "label",
              required: true,
            },
            {
              type: "string",
              label: "URL",
              name: "url",
              required: true,
            },
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
        itemProps: (item) => {
          return {
            label: item.label || 'Menu Item',
          };
        },
      },
      fields: [
        {
          type: "string",
          label: "Label",
          name: "label",
          required: true,
        },
        {
          type: "string",
          label: "URL",
          name: "url",
          required: true,
        },
        {
          type: "object",
          label: "Submenu Items",
          name: "subitems",
          list: true,
          ui: {
            itemProps: (item) => {
              return {
                label: item.label || 'SubMenu Item',
              };
            },
          },
          fields: [
            {
              type: "string",
              label: "Label",
              name: "label",
              required: true,
            },
            {
              type: "string",
              label: "URL",
              name: "url",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
