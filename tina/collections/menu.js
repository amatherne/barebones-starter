/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Menus",
  name: "menu",
  path: "content/menus",
  format: "json",
  ui: {
    filename: {
      readonly: true,
      slugify: (values) => {
        if (values.name) {
          return values.name.toLowerCase().replace(/ /g, '-');
        }
        return 'default-filename';
      },
    },
  },
  fields: [
    {
      type: "string",
      label: "Menu Name",
      name: "name",
      isTitle: true,
      required: true,
    },
    {
      type: "object",
      label: "Menu Items",
      name: "items",
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