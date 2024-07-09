/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Websites",
  name: "website",
  path: "content/website",
  format: "mdx",
  defaultItem: () => {
    return {
      published: true,
      gallery: [
        {
          src: '',
          alt: 'Default Hero Image',
          hero: true, // Default the first image as hero
        },
      ],
    };
  },
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
      return `/websites/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "boolean",
      label: "Publish",
      name: "published",
    },
    {
      type: 'object',
      label: 'Gallery',
      name: 'gallery',
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.alt || 'New Image',
          thumbnail: item?.src,
        }),
        validate: (values) => {
          const heroCount = values.gallery.filter(item => item.hero).length;
          if (heroCount > 1) {
            throw new Error("Only one gallery image can be marked as hero.");
          }
        },
      },
      fields: [
        {
          type: 'image',
          label: 'Image',
          name: 'src',
        },
        {
          type: 'string',
          label: 'Alt Text',
          name: 'alt',
        },
        {
          type: "boolean",
          label: "Hero",
          name: "hero",
          ui: {
            component: 'checkbox',
            parse: (value, values) => {
              // Ensure only one hero is allowed
              if (value) {
                values.gallery.forEach((item, index) => {
                  if (index !== values.index) {
                    item.hero = false;
                  }
                });
              }
              return value;
            },
          },
        },
      ],
    },
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true,
    },
    {
      label: "Website Body",
      name: "body",
      type: "rich-text",
      isBody: true,
    },
    {
      type: "string",
      label: "URL",
      name: "url",
    },
    {
      type: "string",
      label: "Length of Service Provided",
      name: "time_span",
    },
  ],
};
