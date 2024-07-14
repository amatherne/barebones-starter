// ../components/gallery.tsx

import React from 'react';
import ImgOutput from './utilities/img';

interface GalleryProps {
  gallerySettings: {
    height?: string | null;
    min_height?: string | null;
    max_height?: string | null;
    gallery: Array<{ src: string; alt: string }>;
  };
}

const Gallery: React.FC<GalleryProps> = ({ gallerySettings }) => {
  const { height, min_height, max_height, gallery } = gallerySettings;

  const galleryStyle: any = { 
    ...(height && { '--height--default': height.replace('%', 'vw') }),
    ...(min_height && { '--height--min': min_height.replace('%', 'vw') }),
    ...(max_height && { '--height--max': max_height.replace('%', 'vw') }),
  };

  const galleryClass = `
    ${height && min_height && max_height ? 'set-height--clamp' : ''}
    ${height && !min_height && !max_height ? 'set-height--default' : ''}
    ${height && min_height && !max_height ? 'set-height--min' : ''}
    ${height && !min_height && max_height ? 'set-height--max' : ''}
  `.trim();

  return (
    <div className={`gallery ${galleryClass ? 'set-height ' + galleryClass : ''}`} style={galleryStyle}>
      {gallery.map((image, index) => (
        <div key={index} className="gallery--item">
          <ImgOutput src={image.src} alt={image.alt} className="gallery--image" />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
