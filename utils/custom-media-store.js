// ../utils/custom-media-store.js

import fetch from 'isomorphic-fetch';

class CustomMediaStore {
  async persist(files) {
    console.log('CustomMediaStore persist called with files:', files);
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Failed to upload file');
          }

          const { url } = await response.json();

          return {
            id: file.name,
            type: file.type,
            filename: file.name,
            directory: '',
            src: url,
          };
        } catch (error) {
          console.error('Error uploading file:', error);
          throw error;
        }
      })
    );

    return uploadedFiles;
  }

  async previewSrc(filename) {
    console.log('CustomMediaStore previewSrc called with filename:', filename);
    try {
      return `/uploads/${filename}`;
    } catch (error) {
      console.error('Error getting preview source:', error);
      throw error;
    }
  }

  async list() {
    console.log('CustomMediaStore list called');
    try {
      const response = await fetch('/api/list-files');
      if (!response.ok) {
        throw new Error('Failed to list files');
      }
      const files = await response.json();
      return files.map((file) => ({
        id: file.id,
        type: file.type,
        filename: file.filename,
        directory: '',
        src: file.url,
      }));
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  async delete(media) {
    console.log('CustomMediaStore delete called with media:', media);
    try {
      const response = await fetch(`/api/delete/${media.id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete file');
      }
      console.log('Deleted media:', media);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
}

export default CustomMediaStore;
