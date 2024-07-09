/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Websites",
  name: "website",
  path: "content/website",
  format: "mdx",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "URL",
      name: "url",
    },
    {
      type: "image",
      label: "Hero Image",
      name: "hero_image",
    },
    {
      type: "string",
      label: "Length of Service Provided",
      name: "time_span",
    },
    {
      label: "Website Body",
      name: "body",
      type: "rich-text",
      isBody: true,
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/websites/${document._sys.filename}`;
    },
  },
};
