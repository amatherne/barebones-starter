// ../tina/schemas/blocks/main-content-section.js

const PageBlocksMain = {
  type: 'object',
  label: 'Main Content',
  name: 'main',
  fields: [
    {
      type: 'string',
      label: 'Title (optional)',
      name: 'title',
    },
    {
      type: 'rich-text',
      label: 'Text (optional)',
      name: 'text',
    },
    {
      type: 'object',
      label: 'Styles',
      name: 'styles',
      fields: [
        {
          type: "string",
          component: 'select',
          label: "Section Colors",
          name: "colors",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item.label || 'Style',
            }),
          },
          options: [
            { value:"",                   label:"Colors 1" },
            { value:"color--2",           label:"Colors 2" },
            { value:"color--gradient",    label:"Gradient BG" },
          ]
        },

      ],
    },
    {
      type: 'string',
      label: 'Custom CSS',
      name: 'custom_css',
      component: 'textarea'
    },
  ],
};

export default PageBlocksMain;