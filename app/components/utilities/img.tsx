// ../components/utilities/img.tsx

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import importIcon from '../../../utils/importIcon';
import { convertFileNameToCamelCase } from '../../../utils/helpers';
import { useImageMetadata } from '../contexts/imageMetadataContext';

interface Size {
  path: string;
  width: string;
}

interface Metadata {
  original: {
    path: string;
    width: string;
    fileName: string;
    aspectRatio: string;
    height: string;
  };
  sizes: Size[];
}

interface ImageMetadata {
  [key: string]: Metadata;
}

interface ImgProps {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string;
  lazy?: boolean;
}

const Img: React.FC<ImgProps> = ({ src, alt, className, sizes, lazy }) => {
  const [SvgComponent, setSvgComponent] = useState<React.FC | null>(null);
  const metadata = useImageMetadata() as ImageMetadata;

  const isSvg = src.endsWith('.svg');
  const isLazy = lazy !== undefined ? lazy : true;

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.classList.remove('lazyload');
    event.currentTarget.classList.add('lazyloaded');
  };

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
  }, [src, isSvg]);

  const baseFileName = src.split('/').pop();
  const camelSrc = convertFileNameToCamelCase(baseFileName);
  const newPath = '/media/';
  const newSrc = newPath + camelSrc + '-100x50.webp';

  const imageIDString = `image--${camelSrc ? '--' + camelSrc : ''}${alt ? '--' + alt : ''}${className ? '--' + className : ''}`;
  const imageID = convertFileNameToCamelCase(imageIDString);

  let imgSrc = isSvg ? src : newSrc;
  let imgSrcSet = '';
  let imgSizes = '100vw';

  let aspectRatio = '';
  let imgWidth = '';
  let imgHeight = '';
  let originalSrc = '';

  if (metadata[camelSrc]) {
    const original = metadata[camelSrc].original;
    const sizes = metadata[camelSrc].sizes;

    const removePublicPath = (path: string): string => path.replace(/^\/?public/, '');

    imgSrcSet = [
      `${removePublicPath(original.path)} ${original.width}w`,
      ...sizes.map(size => `${removePublicPath(size.path)} ${size.width}w`)
    ].join(', ');

    imgSizes = [
      `(max-width: ${original.width}px) ${original.width}px`,
      ...sizes.map(size => `(max-width: ${size.width}px) ${size.width}px`)
    ].join(', ');

    originalSrc = `${newPath}${original.fileName}`;
    aspectRatio = original.aspectRatio;
    imgWidth = original.width;
    imgHeight = original.height;
  }

  return (
    <div
      className={`image--outer ${imageID} ${className || ''}`}
    >
      {isSvg && SvgComponent ? (
        <Suspense fallback={<div>Loading...</div>}>
          <SvgComponent />
        </Suspense>
      ) : (
        <div 
          className="image--inner"
          style={
            {
              '--image--set-height': aspectRatio ? `calc(${aspectRatio} * 100%)` : '56.6%', 
              '--image--original-source': `url('${originalSrc}')`,
              '--image--natural-width': `${imgWidth}px`,
              '--image--natural-height': `${imgHeight}px`,
            } as React.CSSProperties
          } 
        >
          <img
            src={imgSrc}
            alt={alt || ''}
            className="image--image lazyload"
            srcSet={!isSvg ? imgSrcSet : undefined}
            sizes={!isSvg ? imgSizes || '100vw' : undefined}
            loading={!isSvg && isLazy ? 'lazy' : undefined}
            onLoad={handleImageLoad}
          />
        </div>
      )}
    </div>
  );
};

export default Img;
