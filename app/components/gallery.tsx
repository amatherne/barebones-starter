// ../components/gallery.tsx

import React from 'react';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';
import ImgOutput from './utilities/img';
import { formatUrl } from './utilities/formatUrl';
import Link from 'next/link';

interface GalleryItem {
  src: string;
  alt: string;
  title?: string;
  text?: TinaMarkdownContent | TinaMarkdownContent[];
  buttonText?: string;
  buttonUrl?: string;
  buttonContent?: any;
  custom_css?: any;
}

interface GalleryProps {
  gallerySettings: {
    height?: string | null;
    min_height?: string | null;
    max_height?: string | null;
    gallery: GalleryItem[];
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
        const buttonText      = item.buttonText || '';
        const buttonUrl       = item.buttonUrl || '';
        const buttonContent   = item.buttonContent || '';

        let buttonLink: string = buttonUrl;
        if (buttonContent) {
          buttonLink = formatUrl(buttonContent);  
        }

        let customCSS       = item.custom_css || '';

        const hasButton       = buttonText && buttonLink;
        const hasOverlayLink  = !hasButton && buttonLink;

        const linkTitle: string = title || (typeof text === 'string' ? text : imageAlt || '');

        const hasContent      = title || text || hasButton;

        const itemIDString    = `gallery--item--${image}-${imageAlt}-${title}`;
        const itemID = 
          itemIDString
            .toLowerCase()
            .replace(/[^\w\s-]/gi, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

        if (customCSS) {
          customCSS = 
            customCSS
              .replace('==', '.' + itemID)
              .replace(';;', '##')
              .replace(';', '!important;')
              .replace('##', ';')
        }

        return (
          <div key={index} className={`gallery--item ${itemID}`}>
            { hasOverlayLink && buttonLink ? (
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

            {customCSS ? (
              <style>{`
                ${customCSS}
              `}</style>
            ) : null }

          </div>
        );
      })}
    </section>
  );
};

export default Gallery;
