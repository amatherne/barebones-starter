// ../app/components/test-media.tsx

import { useCMS, Media, MediaList } from 'tinacms';
import React, { useState } from 'react';

const TestMedia = () => {
  const cms = useCMS();
  const [mediaList, setMediaList] = useState<Media[]>([]);

  const handleListMedia = async () => {
    try {
      const mediaListResponse: MediaList = await cms.media.store.list();
      const mediaArray: Media[] = mediaListResponse.items.map((item) => ({
        id: item.id,
        filename: item.filename,
        // Add more fields as needed
      }));
      setMediaList(mediaArray);
      console.log('Media list:', mediaArray);
    } catch (error) {
      console.error('Error listing media:', error);
    }
  };

  const handleEnableCMS = () => {
    cms.enable();
    console.log('TinaCMS enabled:', cms.enabled);
  };

  return (
    <div>
      <h2>Test Media Component</h2>
      <button onClick={handleEnableCMS}>Enable TinaCMS</button>
      <button onClick={handleListMedia}>List Media</button>
      <ul>
        {mediaList.map((media) => (
          <li key={media.id}>{media.filename}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestMedia;
