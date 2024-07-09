/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Menus",
  name: "menu",
  path: "content/menus",
  format: "mdx",
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