/**
 * @type {import('tinacms').Collection}
 */

import blockSelector from '../schemas/components/block-selector';


export default {
  label: "Websites",
  name: "website",
  path: "content/websites",
  format: "mdx",
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

    defaultItem: () => ({
      published: true, 
      // Ensure all other required fields or items are included
      ...(item.defaultItem ? item.defaultItem() : {}), // Use defaultItem if it exists
    }),
  },
  fields: [
    {
      type: "boolean",
      label: "Publish",
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
      type: "string",
      label: "URL",
      name: "url",
    },
    {
      type: "string",
      label: "Length of Service Provided",
      name: "time_span",
    },
    blockSelector,    
    {
      type: "string",
      label: "SEO Title",
      name: "seo_title",
    },
    {
      label: "SEO Text",
      name: "seo_text",
      type: "rich-text",
    },
  ],
};
