// ../tina/schemas/components/link.js

const link = {
  type: 'object',
  label: 'Link',
  name: 'link',
  fields: [
    {
      type: 'string',
      label: 'Text',
      name: 'text',
    },
    {
      type: 'string',
      label: 'Url',
      name: 'url',
    },
    {
      type: 'reference',
      label: 'Url (content)',
      name: 'content',
      collections: [
        'page',
        'website',
        'sounds',
        'post',
      ],
    },
    {
      type: "string",
      component: 'select',
      label: "Desktop Button",
      name: "desktop_button",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item.label || 'Style',
        }),
      },
      options: [
        { value:"md-up--button--primary",   label:"Primary" },
        { value:"md-up--button--secondary", label:"Secondary" },
        { value:"md-up--button--tertiary",  label:"Tertiary" },
        { value:"md-up--button--gradient",  label:"Gradient 1" },
        { value:"md-up--button--gradient-2",label:"Gradient 2" },
      ]
    },
    {
      type: "string",
      component: 'select',
      label: "Mobile Button",
      name: "mobile_button",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item.label || 'Style',
        }),
      },
      options: [
        { value:"sm--button--primary",      label:"Primary" },
        { value:"sm--button--secondary",    label:"Secondary" },
        { value:"sm--button--tertiary",     label:"Tertiary" },
        { value:"sm--button--gradient",     label:"Gradient 1" },
        { value:"sm--button--gradient-2",   label:"Gradient 2" },
      ]
    },
  ],
};

export default link;
