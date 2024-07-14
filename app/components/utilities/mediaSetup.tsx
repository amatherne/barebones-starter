// ../components/utilities/mediaSetup.tsx

import React, { useState, useEffect } from 'react';
import { TinaCMS, TinaProvider } from 'tinacms';

interface File {
  id: number;
  filename: string;
  type: string;
  url: string;
}

const MediaSetup = () => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch('/api/list-files');
        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }
        const filesData = await response.json();
        setFiles(filesData);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    }

    fetchFiles();
  }, []);

  const cms = new TinaCMS({
    enabled: true,
    sidebar: true,
    media: {
      uploadDir: '/uploads', // Adjust based on your project structure
      list: async function listMedia() {
        return files.map(file => ({
          id: file.id.toString(),
          type: file.type,
          directory: '',
          filename: file.filename,
          src: file.url,
        }));
      },
      persist: async function persistMedia(file) {
        // Implement logic to handle media persistence if needed
        console.log('Persist media:', file);
        return file;
      },
      delete: async function deleteMedia(file) {
        // Implement logic to handle media deletion if needed
        console.log('Delete media:', file);
        return file;
      },
    },
  });

  return (
    <TinaProvider cms={cms}>
      {/* Optionally, you can render a wrapper component */}
      {/* This could include your html lang="en" and layout structure */}
      {/* Example: <html lang="en">...</html> */}
      {/* Ensure you also import TinaProvider from 'tinacms' at the start of this document. */}
      <div>
        {/* Your existing layout structure or components can go here */}
      </div>
    </TinaProvider>
  );
};

export default MediaSetup;
