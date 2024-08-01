// ../tina/schemas/components/alignment.js

const alignment = {
  type: 'object',
  label: 'Content Alignment',
  name: 'alignment',
  fields: [
    {
      type: "string",
      component: 'select',
      label: "Desktop Text Alignment",
      name: "desktop_text_align",
      list: true,
      options: [
        { value:"",                       label:"Default" },
        { value:"lg-up--text-center ",    label:"Text Center" },
        { value:"lg-up--text-left ",      label:"Text Left" },
        { value:"lg-up--text-right ",     label:"Text Right" },
      ]
    },
    {
      type: "string",
      component: 'select',
      label: "Tablet Text Alignment",
      name: "tablet_text_align",
      list: true,
      options: [
        { value:"",                       label:"Default" },
        { value:"md--text-center ",       label:"Text Center" },
        { value:"md--text-left ",         label:"Text Left" },
        { value:"md--text-right ",        label:"Text Right" },
      ]
    },
    {
      type: "string",
      component: 'select',
      label: "Mobile Text Alignment",
      name: "mobile_text_align",
      list: true,
      options: [
        { value:"",                       label:"Default" },
        { value:"sm--text-center ",       label:"Text Center" },
        { value:"sm--text-left ",         label:"Text Left" },
        { value:"sm--text-right ",        label:"Text Right" },
      ]
    },
  ],
};

export default alignment;
