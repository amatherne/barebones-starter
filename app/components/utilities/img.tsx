// app/components/utilities/img.tsx
'use client';

import React, { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';

interface ImgProps {
  src: string;
  alt?: string;
  className?: string;
}

const Img: React.FC<ImgProps> = ({ src, alt, className }) => {
  const [SvgComponent, setSvgComponent] = useState<React.FC | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    if (src && src.endsWith('.svg')) {
      const fileName = src.split('/').pop();
      const DynamicSvg = dynamic(() => import(`../../../public/svgs/${fileName}`));
      console.log(fileName)
      setSvgComponent(() => DynamicSvg);
    } else {
      setSvgComponent(null);
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
    <div className={`image--outer ${imageID} ${className || ''}`}>
      {SvgComponent ? (
        <SvgComponent className={className} />
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
