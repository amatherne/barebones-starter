/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Sounds",
  name: "sounds",
  path: "content/sounds",
  format: "mdx",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true,
    },
    {
      type: "rich-text",
      label: "Sounds Body",
      name: "body",
      isBody: true,
    },
  ],
  ui: {
    filename: {
      readonly: true,
      slugify: (values) => {
        if (values.title) {
          return values.title.toLowerCase().replace(/ /g, '-');
        }
        return 'default-filename';
      },
    },
    router: ({ document }) => {
      return `/sounds/${document._sys.filename}`;
    },
  },
};
