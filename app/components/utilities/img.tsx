import React, { useState, useEffect } from 'react';

export const Img = ({ src, alt, className }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [imageID, setImageID] = useState('');

  useEffect(() => {
    // Generate a unique image ID
    const id = `image-${Math.floor(Math.random() * 1000000)}`;
    setImageID(id);

    // Fetch image dimensions
    getImageDimensions(src)
      .then(dimensions => {
        setDimensions(dimensions);
      })
      .catch(error => {
        console.error('Error loading image dimensions:', error);
      });

    // Clean up style element on component unmount
    return () => {
      // removeImageStyle(id);
    };
  }, [src]);

  const aspectRatio = dimensions.width / dimensions.height;
  const paddingTop = (1 / aspectRatio) * 100;

  function getImageDimensions(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = (err) => {
        reject(err);
      };
      img.src = url;
    });
  }

  return (
    <>

      <div className={`image--outer image--${imageID} ${className ? className : ''}`}>
        <link rel="preload" href={src} as="image" />
        <div className="image--inner">
          <img
            src={src}
            alt={alt}
            loading="lazy" 
          />
        </div>
        <style jsx>{`
          .image--${imageID} {
            --image--natural-width: ${dimensions.width}px;
            --image--natural-height: ${paddingTop}%;
            --image--set-width: var(--image--natural-width);
            --image--set-height: var(--image--natural-height);
            max-width: var(--image--set-width, 100%);
          }
          .image--${imageID} .image--inner {
            padding-top: var(--image--set-height, 56.6%);
          }
        `}</style>
      </div>
    </>
  );
};
