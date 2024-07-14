// ../tina/schemas/link.js

const link = {
  type: 'object',
  label: 'Link',
  name: 'link',
  // ui: {
  //   itemProps: (item) => {
      
  //     const linkTitle = item?.text ? item.text : null;

  //     console.log('Button itemProps:', item?.button);

  //     return {
  //       label: linkTitle || 'FUCK',
  //       // thumbnail: item.src || '',
  //     };
  //   },
  // },
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
  ],
};

export default link;
