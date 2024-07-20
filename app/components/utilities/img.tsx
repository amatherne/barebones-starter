// app/components/utilities/img.tsx

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import importIcon from '../../../utils/importIcon';

import { convertFileNameToCamelCase } from '../../../utils/helpers';

interface ImgProps {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string; // New prop for responsive sizes
}

const Img: React.FC<ImgProps> = ({ src, alt, className, sizes }) => {
  const [SvgComponent, setSvgComponent] = useState<React.FC | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    const loadIcon = async () => {
      if (src.endsWith('.svg')) {
        const fileName = convertFileNameToCamelCase(src.split('/').pop()?.replace('.svg', '') || '');
        const IconComponent = await importIcon(fileName);
        setSvgComponent(() => IconComponent);
      } else {
        setSvgComponent(null);
      }
    };

    loadIcon();
  }, [src]);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setDimensions({ width: naturalWidth, height: naturalHeight });
  };

  const formatedSrc = src.split('/').pop().split('.').slice(0, -1).join('.');
  const newSrc = '/images/'+convertFileNameToCamelCase(formatedSrc || '')+'.webp';

  const imageIDString = `image--${newSrc ? '--' + newSrc : ''}${alt ? '--' + alt : ''}${className ? '--' + className : ''}`;
  const imageID = imageIDString
    .toLowerCase()
    .replace(/[^\w\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const imgSrcSet = `${newSrc}?w=500&h=250 500w, ${newSrc}?w=1000&h=500 1000w`; // Example srcSet for responsive images

  return (
    <div className={`image--outer ${imageID} ${className || ''}`}>
      {src.endsWith('.svg') && SvgComponent ? (
        <Suspense fallback={<div>Loading...</div>}>
          <SvgComponent />
        </Suspense>
      ) : (
        <img
          src={newSrc}
          alt={alt || ''}
          className="image--image"
          srcSet={imgSrcSet}
          sizes={sizes || '100vw'} // Use sizes prop or default to 100vw
          loading="lazy" // Lazy load images
          onLoad={handleImageLoad}
        />
      )}
      {!src.endsWith('.svg') && dimensions.width && dimensions.height ? (
        <style jsx>{`
          .image--${imageID} {
            --image--natural-width: ${dimensions.width}px;
            --image--natural-height: ${dimensions.height}px;
            --image--aspect-ratio: ${(dimensions.width / dimensions.height).toFixed(2)};
          }
        `}</style>
      ) : null}
    </div>
  );
};

export default Img;
