// ../app/components/utilities/img.tsx

'use client';

import React, { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import { SvgDataContext } from '../../../public/SvgDataContext'; // Adjust as per your actual context setup
// import { svgConfig } from './svgConfig'; // Import your SVG configuration here

interface ImgProps {
  src: string;
  alt?: string;
  className?: string;
}

const Img: React.FC<ImgProps> = ({ src, alt, className }) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const { svgPath } = useContext(SvgDataContext);

  useEffect(() => {
    if (src && src.endsWith('.svg')) {
      const fileName = src.split('/').pop();
      const SvgComponent = dynamic(() => import(`../../../public/svgs/${fileName}`));
      // Ensure proper handling or transformation using SvgComponent
    }
  }, [src]);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setDimensions({ width: naturalWidth, height: naturalHeight });
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
      {src && src.endsWith('.svg') ? (
        <SvgComponent width={24} height={24} {...svgConfig} /> // Pass svgConfig here
      ) : (
        <img
          src={src}
          alt={alt || ''}
          className="image--image"
          onLoad={handleImageLoad}
        />
      )}
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
