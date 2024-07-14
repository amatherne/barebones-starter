// ../tina/schemas/image.js

import { MediaUploadFieldPlugin } from '@tinacms/fields';

const imageField = {
  label: 'Image',
  name: 'image',
  component: 'image',
  type: 'image',
  plugins: [MediaUploadFieldPlugin],
  parse: (media) => {
    console.log(media)
    if (media.filename) {
      const newFilename = media.filename.replace(/\s+/g, '-'); // Replace spaces with hyphens
      console.log(newFilename)
      return {
        ...media,
        filename: newFilename,
      };
    }
    return media;
  },
};

export default imageField;
