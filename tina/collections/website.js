/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Websites",
  name: "website",
  path: "content/website",
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
      type: "string",
      label: "Website Body",
      name: "body",
      isBody: true,
      ui: {
        component: "rich-text",
      },
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/websites/${document._sys.filename}`;
    },
  },
};
