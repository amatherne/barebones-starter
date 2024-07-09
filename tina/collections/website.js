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
        itemProps: (item) => {
          console.log('Gallery Item:', item); // Debugging line
          return {
            label: `${item.hero ? '(H) ' : ''}${item.alt || item.src || 'Image'}`,
            thumbnail: item.src || '', // from chatGPT
            image: item.src || '', // test
          };
        },
        // validate: (values) => {
        //   console.log("Validation values:", values);
        //   if (values?.gallery) {
        //     const gallery = values.gallery;
        //     const heroCount = gallery.filter(item => item.hero).length;
        //     if (heroCount > 1) {
        //       return "Only one gallery image can be marked as hero.";
        //     }
        //   }
        // },
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
          // parse: (value, field, allValues) => {
          //   // Ensure only one hero is allowed
          //   if (value) {
          //     allValues.gallery.forEach((item) => {
          //       if (item !== field) {
          //         item.hero = false;
          //       }
          //     });
          //   }
          //   return value;
          // },
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
