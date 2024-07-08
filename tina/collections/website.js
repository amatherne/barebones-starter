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
      label: "Website Body",
      name: "body",
      isBody: true,
      ui: {
        component: "textarea",
      },
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/websites/${document._sys.filename}`;
    },
  },
};
