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

  const isSvg = src.endsWith('.svg');

  useEffect(() => {
    const loadIcon = async () => {
      if (isSvg) {
        const fileName = convertFileNameToCamelCase(src.split('/').pop() || '');
        console.log(src.split('/').pop())
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

  const baseFileName = src.split('/').pop();
  const camelSrc = convertFileNameToCamelCase(baseFileName);
  const newPath = 'images/';
  const newSrc = newPath+camelSrc;

  const imageIDString = `image--${camelSrc ? '--' + camelSrc : ''}${alt ? '--' + alt : ''}${className ? '--' + className : ''}`;
  const imageID = imageIDString
    .toLowerCase()
    .replace(/[^\w\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  let imgSrc = src;

  // Image paths for different sizes
  const imgSrcSet = `
    ${newSrc}-500x250.webp 750w, 
    ${newSrc}-1000x500.webp 1500w, 
    ${newSrc}-2000x1000.webp 3000w,
    ${newSrc}-3000x1500.webp 4500w
  `;

  const imgSizes = '100vw';

  if (!isSvg) {
    imgSrc = `${newSrc}-500x250.webp`;
  }

  return (
    <div className={`image--outer ${imageID} ${className || ''}`}>
      {isSvg && SvgComponent ? (
        <Suspense fallback={<div>Loading...</div>}>
          <SvgComponent />
        </Suspense>
      ) : (
        <img
          src={imgSrc} // Default image
          alt={alt || ''}
          className="image--image"
          srcSet={!isSvg ? imgSrcSet : undefined}
          sizes={!isSvg ? imgSizes || '100vw' : undefined}
          loading={!isSvg ? 'lazy' : undefined}
          onLoad={handleImageLoad}
        />
      )}
      {!isSvg && dimensions.width && dimensions.height ? (
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
