'use client';

import React, { useState, useEffect, Suspense } from 'react';
import importIcon from '../../../utils/importIcon';
import { convertFileNameToCamelCase } from '../../../utils/helpers';

interface ImgProps {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string;
}

const Img: React.FC<ImgProps> = ({ src, alt, className, sizes }) => {
  const [SvgComponent, setSvgComponent] = useState<React.FC | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const isSvg = src.endsWith('.svg');

  useEffect(() => {
    const loadIcon = async () => {
      if (isSvg) {
        const fileName = convertFileNameToCamelCase(src.split('/').pop() || '');
        const IconComponent = await importIcon(fileName);
        setSvgComponent(() => IconComponent);
      } else {
        setSvgComponent(null);
      }
    };

    loadIcon();
  }, [src,isSvg]);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setDimensions({ width: naturalWidth, height: naturalHeight });
  };

  const baseFileName = src.split('/').pop();
  const camelSrc = convertFileNameToCamelCase(baseFileName);
  const newPath = '/media/';
  const newSrc = newPath+camelSrc;

  const imageIDString = `image--${camelSrc ? '--' + camelSrc : ''}${alt ? '--' + alt : ''}${className ? '--' + className : ''}`;
  const imageID = convertFileNameToCamelCase(imageIDString);

  let imgSrc = src;

  const imgSrcSet = `
    ${newSrc}-500x250.webp 500w, 
    ${newSrc}-1000x500.webp 1000w, 
    ${newSrc}-2000x1000.webp 2000w,
    ${newSrc}-3000x1500.webp 3000w
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
          src={imgSrc} 
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
          .${imageID} {
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
