/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Pages",
  name: "page",
  path: "content/page",
  format: "mdx",
  defaultItem: () => {
    return {
      gallery: [
        {
          src: '',
          alt: '',
        },
      ],
    };
  },
  fields: [
    {
      type: 'object',
      label: 'Gallery',
      name: 'gallery',
      list: true,
      ui: {
        itemProps: (item) => {
          const imgTitle = item.src.substring(item.src.lastIndexOf('/') + 1);
          const galleryTitle = item.title;
          return {
            label: `${galleryTitle || item.alt || imgTitle || 'Image'}`,
            // thumbnail: item.src || '', // from chatGPT
            // image: item.src || '', // test
          };
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
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: "rich-text",
          label: "Text",
          name: "text",
        },
        {
          type: 'object',
          label: 'Button',
          name: 'button',
          fields: [
            {
              type: "string",
              label: "Button Text",
              name: "button_text",
            },
            {
              type: "string",
              label: "Button Url",
              name: "button_url",
            },
            {
              type: 'reference',
              label: 'Button Url (content)',
              name: 'button_url_content',
              collections: [
                'page',
                'website',
                'sounds',
                'post'
              ], 
            },
          ],
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
