// ../app/components/utilities/Img.js

import React, { useState } from 'react';

const Img = ({ src, alt, className }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setDimensions({ width: naturalWidth, height: naturalHeight });
  };

  const imageID = `${src}-${alt}-${className}`;

  return (
    <div className={`image-outer image-${imageID} ${className ? className : ''}`}>
      <img
        src={src}
        alt={alt}
        className="image-inner"
        onLoad={handleImageLoad}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      {dimensions.width && dimensions.height && (
        <style jsx>{`
          .image-${imageID} {
            --image-natural-width: ${dimensions.width}px;
            --image-natural-height: ${dimensions.height}px;
          }
        `}</style>
      )}
    </div>
  );
};

export default Img;
