// ../app/components/utilities/img.tsx

'use client';

import React, { useState, useEffect } from 'react';

interface ImgProps {
  src: string;
  alt?: string;
  className?: string;
}

const Img: React.FC<ImgProps> = ({ src, alt, className }) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (src && src.endsWith('.svg')) {
      const fetchSVG = async () => {
        try {
          const response = await fetch(src);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.text();
          setSvgContent(data);
        } catch (error) {
          console.error('Error fetching SVG:', error);
          setFetchError(`Error fetching SVG: ${error.message}`);
        }
      };

      fetchSVG();
    }
  }, [src]);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (!src.endsWith('.svg')) {
      const { naturalWidth, naturalHeight } = event.currentTarget;
      setDimensions({ width: naturalWidth, height: naturalHeight });
    }
  };

  const imageIDString = `image--${src ? '--' + src : ''}${alt ? '--' + alt : ''}${className ? '--' + className : ''}`;
  const imageID = imageIDString
    .toLowerCase()
    .replace(/[^\w\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return (
    <div className={`image--outer ${imageID} ${className ? className : ''}`}>
      {svgContent ? (
        <div
          className="image--svg"
          dangerouslySetInnerHTML={{ __html: svgContent }}
          aria-label={alt || ''}
        />
      ) : (
        <img
          src={src}
          alt={alt || ''}
          className="image--image"
          onLoad={handleImageLoad}
        />
      )}
      {fetchError && <div className="error-message">{fetchError}</div>}
      {!src.endsWith('.svg') && dimensions.width && dimensions.height ? (
        <style jsx>{`
          .image--${imageID} {
            --image--natural-width: ${dimensions.width}px;
            --image--natural-height: ${(1 / (dimensions.width / dimensions.height)) * 100}%;
          }
        `}</style>
      ) : null}
    </div>
  );
};

export default Img;
