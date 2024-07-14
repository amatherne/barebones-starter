// ../app/components/utilities/img.js

import React from 'react';
import { useCMS } from 'tinacms';

const ImgOutput = ({ src, alt, className }) => {
  const cms = useCMS();
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const getImageDimensions = async () => {
      try {
        const response = await fetch(src);
        const blob = await response.blob();
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        img.onload = () => {
          setDimensions({ width: img.width, height: img.height });
        };
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    getImageDimensions();
  }, [src, alt, className]);

  const aspectRatio = dimensions.width / dimensions.height;
  const paddingTop = (1 / aspectRatio) * 100;

  const generateHmacSha1 = (source, key) => {
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha1', key);
    hmac.update(source);
    return hmac.digest('hex');
  };

  const key = src + alt + className;
  const imageID = generateHmacSha1(src, key);

  return (
    dimensions.width && dimensions.height && (
      <div className={`image--outer image--${imageID} ${className ? className : ''}`}>
        <div className="image--inner">
            <img
              src={src}
              alt={alt}
              loading="lazy"
              width={dimensions.width}
              height={dimensions.height}
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
    )
  );
};

export default ImgOutput;
