// ../app/components/utilities/Img.js

'use client';

import React, { useState } from 'react';

const Img = ({ src, alt, className }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setDimensions({ width: naturalWidth, height: naturalHeight });
  };

  const imageIDString = `image--${src?'--'+src:''}${alt?'--'+alt:''}${className?'--'+className:''}`;
  const imageID = 
    imageIDString
      .toLowerCase()
      .replace(/[^\w\s-]/gi, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
      
  return (
    <div className={`image--outer ${imageID} ${className ? className : ''}`}>
      <img
        src={src}
        alt={alt||''}
        className="image--image"
        onLoad={handleImageLoad}
        // style={{ maxWidth: '100%', height: 'auto' }}
      />
      { dimensions.width && dimensions.height ? (
        <style jsx>{`
          .image--${imageID} {
            --image--natural-width: ${dimensions.width}px;
            --image--natural-height: ${ (1 / ( dimensions.width / dimensions.height )) * 100 }%;
          }
        `}</style>
      ) : null }
    </div>
  );
};

export default Img;
