/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Sounds",
  name: "sounds",
  path: "content/sounds",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Sounds Body",
      name: "body",
      isBody: true,
      ui: {
        component: "textarea",
      },
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/sounds/${document._sys.filename}`;
    },
  },
};
