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
    };
  },
  ui: {
    filename: {
      readonly: true, // Make the filename read-only
      slugify: (values) => {
        // Check if isTitle is true and downcase the title
        if (values.title) {
          return values.title.toLowerCase().replace(/ /g, '-');
        }
        return 'default-filename'; // Fallback if isTitle is not true
      },
    },
    router: ({ document }) => {
      return `/websites/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "boolean",
      label: "Published",
      name: "published",
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
      type: "image",
      label: "Hero Image",
      name: "hero_image",
    },
    {
      type: 'string',
      label: 'Alt Text',
      name: 'hero_image_alt',
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
    {
      type: 'object',
      label: 'Gallery',
      name: 'gallery',
      list: true, // This indicates that the field is a list of objects
      ui: {
        itemProps: (item) => ({
          label: item?.alt || 'New Image',
          thumbnail: item?.src, // This will show the image thumbnail
        }),
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
      ],
    },
  ],
};
