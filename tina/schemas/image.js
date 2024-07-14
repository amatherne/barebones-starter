// ../tina/schemas/imageField.js

const imageField = {
  label: 'Image',
  name: 'image',
  component: 'image',
  type: 'image',
  parse: async (media) => {
    try {
      const img = new Image();
      img.src = media.filename;

      // Return a promise that resolves with image dimensions
      return new Promise((resolve, reject) => {
        img.onload = () => {
          resolve({
            src: media.filename,
            width: img.width,
            height: img.height,
          });
        };
        img.onerror = reject;
      });
    } catch (error) {
      console.error('Error loading image dimensions:', error);
      return { src: media.filename, width: 0, height: 0 };
    }
  },
  // Additional configurations can be added here
};

export const fields = [imageField];
