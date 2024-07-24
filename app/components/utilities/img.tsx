// ../components/utilities/img.tsx

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import importIcon from '../../../utils/importIcon';
import { convertFileNameToCamelCase } from '../../../utils/helpers';

interface ImgProps {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string;
  lazy?: string;
}

const Img: React.FC<ImgProps> = ({ src, alt, className, sizes, lazy }) => {
  const [SvgComponent, setSvgComponent] = useState<React.FC | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [metadata, setMetadata] = useState<any>({});

  const isSvg = src.endsWith('.svg');

  const isLazy = lazy || true;

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (!isLazy) return;
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

    const fetchMetadata = async () => {
      try {
        const response = await fetch('/api/metadata');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };

    loadIcon();
    fetchMetadata();
  }, [src, isSvg]);

  const baseFileName = src.split('/').pop();
  const camelSrc = convertFileNameToCamelCase(baseFileName);
  const newPath = '/media/';
  const newSrc = newPath + camelSrc + '-400x200.webp';

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

    const removePublicPath = (path) => path.replace(/^\/public\//, '');

    const srcSet = [
      `${removePublicPath(original.path)} ${original.width}w`,
      ...sizes.map(size => `${removePublicPath(size.path)} ${size.width}w`)
    ].join(', ');

    imgSizes = [
      `(max-width: ${original.width}px) ${original.width}px`,
      ...sizes.map(size => `(max-width: ${size.width}px) ${size.width}px`)
    ].join(', ');

    originalSrc = `${newPath}${original.fileName}`;
    imgSrc = originalSrc;
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
              '--image--aspect-ratio': aspectRatio ? `calc(${aspectRatio} * 100%)` : '56.6%', // Fallback ratio
              '--image--max-source': `url('${originalSrc}')`,
              '--image--natural-width': `${imgWidth}px`,
              '--image--natural-height': `${imgHeight}px`,
            } as React.CSSProperties
          } 
        >
          <img
            src={imgSrc}
            alt={alt || ''}
            className={`image--image ${isLazy ? 'lazyload' : ''}`}
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
