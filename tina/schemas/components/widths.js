// ../tina/schemas/components/widths.js

const widths = {
  type: 'object',
  label: 'Widths',
  name: 'widths',
  // ui: {
  //   itemProps: (item) => {
      
  //     const desktopWidth  = item?.desktop_width.label ? item.desktop_width.label.split(' ')[0] : null;
  //     const tabletWidth   = item?.tablet_width.label ? item.tablet_width.label.split(' ')[0] : null;
  //     const mobileWidth   = item?.mobile_width.label ? item.mobile_width.label.split(' ')[0] : null;
  //     const title         = `Mob:${ctasMobileWidth}; Tblt: ${ctasTabletWidth}; Dsk: ${ctasDesktopWidth};`;

  //     return {
  //       label: title || 'Widths',
  //     };
  //   },
  // },
  // defaultItem: () => {
  //   return {
  //     desktop_width: 'lg-up--w-33',
  //     tablet_width: 'md--w-33',
  //     mobile_width: 'sm--w-50',
  //   }
  // },
  fields: [
    {
      type: "string",
      component: 'select',
      label: "Desktop Width",
      name: "desktop_width",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item.label || 'Width',
        }),
      },
      options: [
        { value:"lg-up--w-12",    label:"12% (1 of 8)" },
        { value:"lg-up--w-16",    label:"16% (1 of 6)" },
        { value:"lg-up--w-25 ",   label:"25% (1 of 4)" },
        { value:"lg-up--w-33 ",   label:"33% (1 of 3)" },
        { value:"lg-up--w-50 ",   label:"50% (1 of 2)" },
        { value:"lg-up--w-66 ",   label:"66% (2 of 3)" },
        { value:"lg-up--w-75 ",   label:"75% (3 of 4)" },
        { value:"lg-up--w-100 ",  label:"100% " },
        { value:"lg-up--w-5",     label:"5%" },
        { value:"lg-up--w-10",    label:"10%" },
        { value:"lg-up--w-15",    label:"15%" },
        { value:"lg-up--w-25",    label:"25%" },
        { value:"lg-up--w-30",    label:"30%" },
        { value:"lg-up--w-35",    label:"35%" },
        { value:"lg-up--w-40",    label:"40%" },
        { value:"lg-up--w-45",    label:"45%" },
        { value:"lg-up--w-50",    label:"50%" },
        { value:"lg-up--w-55",    label:"55%" },
        { value:"lg-up--w-60",    label:"60%" },
        { value:"lg-up--w-65",    label:"65%" },
        { value:"lg-up--w-70",    label:"70%" },
        { value:"lg-up--w-75",    label:"75%" },
        { value:"lg-up--w-80",    label:"80%" },
        { value:"lg-up--w-85",    label:"85%" },
        { value:"lg-up--w-90",    label:"90%" },
        { value:"lg-up--w-100",   label:"100%" },
      ]
    },
    {
      type: "string",
      component: 'select',
      label: "Tablet Width",
      name: "tablet_width",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item.label || 'Width',
        }),
      },
      options: [
        { value:"md--w-12",    label:"12% (1 of 8)" },
        { value:"md--w-16",    label:"16% (1 of 6)" },
        { value:"md--w-25 ",   label:"25% (1 of 4)" },
        { value:"md--w-33 ",   label:"33% (1 of 3)" },
        { value:"md--w-50 ",   label:"50% (1 of 2)" },
        { value:"md--w-66 ",   label:"66% (2 of 3)" },
        { value:"md--w-75 ",   label:"75% (3 of 4)" },
        { value:"md--w-100 ",  label:"100% " },
        { value:"md--w-5",     label:"5%" },
        { value:"md--w-10",    label:"10%" },
        { value:"md--w-15",    label:"15%" },
        { value:"md--w-25",    label:"25%" },
        { value:"md--w-30",    label:"30%" },
        { value:"md--w-35",    label:"35%" },
        { value:"md--w-40",    label:"40%" },
        { value:"md--w-45",    label:"45%" },
        { value:"md--w-50",    label:"50%" },
        { value:"md--w-55",    label:"55%" },
        { value:"md--w-60",    label:"60%" },
        { value:"md--w-65",    label:"65%" },
        { value:"md--w-70",    label:"70%" },
        { value:"md--w-75",    label:"75%" },
        { value:"md--w-80",    label:"80%" },
        { value:"md--w-85",    label:"85%" },
        { value:"md--w-90",    label:"90%" },
        { value:"md--w-100",   label:"100%" },
      ]
    },
    {
      type: "string",
      component: 'select',
      label: "Mobile Width",
      name: "mobile_width",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item.label || 'Width',
        }),
      },
      options: [
        { value:"w-12",    label:"12% (1 of 8)" },
        { value:"w-16",    label:"16% (1 of 6)" },
        { value:"w-25 ",   label:"25% (1 of 4)" },
        { value:"w-33 ",   label:"33% (1 of 3)" },
        { value:"w-50 ",   label:"50% (1 of 2)" },
        { value:"w-66 ",   label:"66% (2 of 3)" },
        { value:"w-75 ",   label:"75% (3 of 4)" },
        { value:"w-100 ",  label:"100% " },
        { value:"w-5",     label:"5%" },
        { value:"w-10",    label:"10%" },
        { value:"w-15",    label:"15%" },
        { value:"w-25",    label:"25%" },
        { value:"w-30",    label:"30%" },
        { value:"w-35",    label:"35%" },
        { value:"w-40",    label:"40%" },
        { value:"w-45",    label:"45%" },
        { value:"w-50",    label:"50%" },
        { value:"w-55",    label:"55%" },
        { value:"w-60",    label:"60%" },
        { value:"w-65",    label:"65%" },
        { value:"w-70",    label:"70%" },
        { value:"w-75",    label:"75%" },
        { value:"w-80",    label:"80%" },
        { value:"w-85",    label:"85%" },
        { value:"w-90",    label:"90%" },
        { value:"w-100",   label:"100%" },
      ]
    },
  ],
};

export default widths;
