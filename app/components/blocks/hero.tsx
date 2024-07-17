// ../components/blocks/hero.tsx

import React from 'react';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';
import ImgOutput from '../utilities/img';
import { formatUrl } from '../utilities/formatUrl';
import Link from 'next/link';

const Hero = ({ settings }) => {

  const height = settings.height;
  const min_height = settings.min_height;
  const max_height = settings.max_height;

  const hero = settings.item;

  if (!hero) return null;

  const heroStyle: any = { 
    ...(height && { '--height--default': height.replace('%', 'vw') }),
    ...(min_height && { '--height--min': min_height.replace('%', 'vw') }),
    ...(max_height && { '--height--max': max_height.replace('%', 'vw') }),
  };

  const heroClass = `
    ${height && min_height && max_height ? 'set-height--clamp' : ''}
    ${height && !min_height && !max_height ? 'set-height--default' : ''}
    ${height && min_height && !max_height ? 'set-height--min' : ''}
    ${height && !min_height && max_height ? 'set-height--max' : ''}
  `.trim();

  return (
    <section 
      className={`hero ${heroClass ? 'set-height ' + heroClass : ''}`} 
      style={heroStyle}
    >
      {hero.map((item, index) => {

        const image               = item.src || null;
        const imageAlt            = item.alt || null;
        const title               = item.title || null;
        const text                = item.text || null;
        const buttonText          = item.button?.text || '';
        const buttonUrl           = item.button?.url || '';
        const buttonContent       = item.button?.content || '';

        let buttonLink: string    = buttonUrl;
        if (buttonContent) {
          buttonLink              = formatUrl(buttonContent);  
        }

        let customCSS             = item.custom_css || '';

        const hasButton           = buttonText && buttonLink;
        const hasOverlayLink      = !hasButton && buttonLink;

        const linkTitle: string   = title || (typeof text === 'string' ? text : imageAlt || '');

        const hasContent          = title || text || hasButton;

        const itemIDString        = `hero--item--${image}-${imageAlt}-${title}`;
        const itemID = 
          itemIDString
            .toLowerCase()
            .replaceAll(/[^\w\s-]/gi, '')
            .replaceAll(/\s+/g, '-')
            .replaceAll(/-+/g, '-')
            .replaceAll(/^-|-$/g, '');

        if (customCSS) {
          customCSS = 
            customCSS
              .replaceAll('==', '.' + itemID)
              .replaceAll(';;', '##')
              .replaceAll(';', '!important;')
              .replaceAll('##', ';')
        }

        return (
          <div key={index} className={`hero--item ${itemID}`}>
            { hasOverlayLink && buttonLink ? (
              <Link 
                href={buttonLink} 
                title={linkTitle} 
                className="overlay--link"
              ></Link>
            ) : null }

            {image ? (
              <ImgOutput src={image} alt={imageAlt} className="ctas--image" />
            ) : null }

            { hasContent ? (
              <div className="hero--text">
                
                { title ? (
                  <h2 className="hxl">{title}</h2>
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

export default Hero;
