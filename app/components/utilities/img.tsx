'use client';

import React, { useState, useEffect, Suspense } from 'react';
import importIcon from '../../../utils/importIcon';
import { convertFileNameToCamelCase } from '../../../utils/helpers';

interface ImgProps {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string; // Prop for responsive sizes
}

const Img: React.FC<ImgProps> = ({ src, alt, className, sizes }) => {
  const [SvgComponent, setSvgComponent] = useState<React.FC | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    const loadIcon = async () => {
      if (src.endsWith('.svg')) {
        const fileName = convertFileNameToCamelCase(src.split('/').pop().replace('.svg', '') || '');
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

  // console.log(src)

  const baseFileName = src.split('/').pop();
  const camelSrc = convertFileNameToCamelCase(baseFileName);
  const newSrc = '/uploads/images/'+camelSrc;
  const ext = '.webp';

  const imageIDString = `image--${camelSrc ? '--' + camelSrc : ''}${alt ? '--' + alt : ''}${className ? '--' + className : ''}`;
  const imageID = imageIDString
    .toLowerCase()
    .replace(/[^\w\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  // Image paths for different sizes
  const imgSrcSet = `
    /images/${camelSrc}-500x250.webp 500w, 
    /images/${camelSrc}-1000x500.webp 1000w, 
    /images/${camelSrc}-2000x1000.webp 2000w,
    /images/${camelSrc}-3000x1300.webp 3000w
  `;

  let imgSrc = `/images/${camelSrc}-500x250.webp`;
  if (src.endsWith('.svg')) {
  }
    imgSrc = src;

  return (
    <div className={`image--outer ${imageID} ${className || ''}`}>
      {src.endsWith('.svg') && SvgComponent ? (
        <Suspense fallback={<div>Loading...</div>}>
          <SvgComponent />
        </Suspense>
      ) : (
        <img
          src={imgSrc} // Default image
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
