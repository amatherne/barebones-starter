// ../tina/collections/page
/**
 * @type {import('tinacms').Collection}
 */

import hero from '../schemas/hero';

export default {
  label: "Pages",
  name: "page",
  path: "content/page",
  format: "mdx",
  fields: [
    hero,
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true,
    },
    {
      name: "body",
      label: "Main",
      type: "rich-text",
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
      if (document._sys.filename === "home") {
        return `/`;
      }
      return undefined;
    },
  },
};
