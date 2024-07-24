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
}

const Img: React.FC<ImgProps> = ({ src, alt, className, sizes }) => {
  const [SvgComponent, setSvgComponent] = useState<React.FC | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [metadata, setMetadata] = useState<any>({});

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

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setDimensions({ width: naturalWidth, height: naturalHeight });
  };

  const baseFileName = src.split('/').pop();
  const camelSrc = convertFileNameToCamelCase(baseFileName);
  const newPath = '/media/';
  const newSrc = newPath + camelSrc;

  const imageIDString = `image--${camelSrc ? '--' + camelSrc : ''}${alt ? '--' + alt : ''}${className ? '--' + className : ''}`;
  console.log(imageIDString)
  const imageID = convertFileNameToCamelCase(imageIDString);
  console.log(imageID)

  let imgSrc = src;
  let imgSrcSet = '';
  let imgSizes = '100vw';

  let aspectRatio = '';
  let imgWidth = '';
  let imgHeight = '';
  let originalSrc = '';

  if (metadata[camelSrc]) {

    const original = metadata[camelSrc].original;
    const sizes = metadata[camelSrc].sizes;
    // console.log(original)

    imgSrc = `${newPath}${original.fileName}`;
    imgSrcSet = sizes.map((size: any) => `${newPath}${size.fileName} ${size.width}w`).join(', ');
    imgSizes = sizes.map((size: any) => `(max-width: ${size.width}px) ${size.width}px`).join(', ');

    originalSrc = original.path;
    aspectRatio = original.aspectRatio;
    imgWidth = original.width;
    imgHeight = original.height;
  }

  return (
    <div className={`image--outer ${imageID} ${className || ''}`}>
      {isSvg && SvgComponent ? (
        <Suspense fallback={<div>Loading...</div>}>
          <SvgComponent />
        </Suspense>
      ) : (
        <div className="image--inner">
          <img
            src={imgSrc}
            alt={alt || ''}
            className="image--image"
            srcSet={!isSvg ? imgSrcSet : undefined}
            sizes={!isSvg ? imgSizes || '100vw' : undefined}
            loading={!isSvg ? 'lazy' : undefined}
            onLoad={handleImageLoad}
          />
        </div>
      )}
      {!isSvg && aspectRatio ? (
        <style jsx global>{`
          .${imageID} {
            --image--max-source: url('${originalSrc}');
            --image--natural-width: ${imgWidth}px;
            --image--natural-height: ${imgHeight}px;
            --image--set-width:var(--image--natural-width);
            --image--set-height:var(--image--natural-height);
            --image--aspect-ratio: calc(${aspectRatio} * 100%);
            max-width:var(--image--set-width,100%);
          }
          .${imageID} .image--inner {
            padding-top:var(--image--aspect-ratio,56.6%);
          }
        `}</style>
      ) : null}
    </div>
  );
};

export default Img;
