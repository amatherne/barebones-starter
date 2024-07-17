/**
 * @type {import('tinacms').Collection}
 */

import hero from '../schemas/blocks/hero';

export default {
  label: "Websites",
  name: "website",
  path: "content/websites",
  format: "mdx",
  defaultItem: () => {
    return {
      published: true,
      gallery: [
        {
          src: '',
          alt: '',
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
    hero,
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
