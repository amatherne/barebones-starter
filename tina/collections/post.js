/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Blog Posts",
  name: "post",
  path: "content/post",
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
      label: "Blog Post Body",
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
      return `/posts/${document._sys.filename}`;
    },
  },
};
