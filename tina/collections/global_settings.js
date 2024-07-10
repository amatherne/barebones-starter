/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Global Settings",
  name: "global_settings",
  path: "content/global_settings",
  format: "json",
  fields: [
    {
      type: "image",
      label: "Logo",
      name: "logo",
    },
    {
      label: 'Main Menu',
      name: 'main_menu',
      type: 'reference',
      collections: ['menu'], // Example collection where main menu items are stored
    },
    {
      label: 'Footer Menu',
      name: 'footer_menu',
      type: 'reference',
      collections: ['menu'], // Example collection where footer menu items are stored
    },
  ],
};