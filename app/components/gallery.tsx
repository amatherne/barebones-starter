// ../components/gallery.tsx

import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import ImgOutput from './utilities/img';
import { formatUrl } from './utilities/formatUrl';
import Link from 'next/link';

interface GalleryProps {
  gallerySettings: {
    height?: string | null;
    min_height?: string | null;
    max_height?: string | null;
    gallery: Array<{ src: string; alt: string; title?: string; text?: string; buttonText?: string; buttonUrl?: string; buttonContent?: any; }>;
  };
}

const Gallery: React.FC<GalleryProps> = ({ gallerySettings }) => {
  const { height, min_height, max_height, gallery } = gallerySettings;

  const galleryStyle: any = { 
    ...(height && { '--height--default': height.replace('%', 'vw') }),
    ...(min_height && { '--height--min': min_height.replace('%', 'vw') }),
    ...(max_height && { '--height--max': max_height.replace('%', 'vw') }),
  };

  const galleryClass = `
    ${height && min_height && max_height ? 'set-height--clamp' : ''}
    ${height && !min_height && !max_height ? 'set-height--default' : ''}
    ${height && min_height && !max_height ? 'set-height--min' : ''}
    ${height && !min_height && max_height ? 'set-height--max' : ''}
  `.trim();

  return (
    <section className={`gallery ${galleryClass ? 'set-height ' + galleryClass : ''}`} style={galleryStyle}>
      {gallery.map((item, index) => {
        const image           = item.src || null;
        const imageAlt        = item.alt || null;
        const title           = item.title || null;
        const text            = item.text || null;
        const buttonText      = item.buttonText || null;
        const buttonUrl       = item.buttonUrl || null;
        const buttonContent   = item.buttonContent || null;

        const hasLink         = buttonUrl || buttonContent;
        const hasButton       = buttonText && hasLink;
        const hasOverlayLink  = !hasButton && hasLink;

        let buttonLink: string | null = buttonUrl;
        if (buttonContent) {
          buttonLink          = formatUrl(buttonContent);  
        }

        const linkTitle       = title || text || imageAlt;
        const hasContent      = title || text || hasButton;

        return (
          <div key={index} className="gallery--item">
            { hasOverlayLink ? (
              <Link 
                href={buttonLink} 
                title={linkTitle} 
                className="overlay-link"
              ></Link>
            ) : null }

            <ImgOutput src={image} alt={imageAlt} className="gallery--image" />

            { hasContent ? (
              <div className="gallery--text">
                
                { title ? (
                  <h2 className="h1">{title}</h2>
                ) : null }

                { text ? (
                  <div className="rte">
                    <TinaMarkdown content={text} />
                  </div>
                ) : null }

                { hasButton ? (
                  <Link 
                    href={buttonLink} 
                    className="button button--gradient"
                  >
                    <span>{buttonText}</span>
                  </Link>
                ) : null }

              </div>
            ) : null }
          </div>
        );
      })}
    </section>
  );
};

export default Gallery;
