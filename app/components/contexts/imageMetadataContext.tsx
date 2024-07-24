// ../contexts/imageMetadataContext.tsx
import React, { createContext, useContext } from 'react';

const ImageMetadataContext = createContext<any>({});

export const ImageMetadataProvider: React.FC<{ metadata: any, children: React.ReactNode }> = ({ metadata, children }) => {
  return (
    <ImageMetadataContext.Provider value={metadata}>
      {children}
    </ImageMetadataContext.Provider>
  );
};

export const useImageMetadata = () => {
  return useContext(ImageMetadataContext);
};
