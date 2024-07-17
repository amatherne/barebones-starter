// ../components/blocks/ctas.tsx

import React from 'react';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';
import ImgOutput from '../utilities/img';
import { formatUrl } from '../utilities/formatUrl';
import Link from 'next/link';

const CTAs = ({ settings }) => {
  
  if (!settings) return null;

  const sectionTitle                = settings.title || null;
  let sectionText                   = settings.text;
  if (sectionText && sectionText.children.length === 0) {
    sectionText                     = null; 
  }
  const sectionButtonText           = settings.button?.text || '';
  const sectionButtonUrl            = settings.button?.url || '';
  const sectionButtonContent        = settings.button?.content || '';

  let sectionButtonLink: string     = sectionButtonUrl;
  if (sectionButtonContent) {
    sectionButtonLink               = formatUrl(sectionButtonContent);  
  }
  const sectionHasButton            = sectionButtonText && sectionButtonLink;

  let sectionCustomCSS              = settings.custom_css || '';

  const ctasMobileWidth             = settings.widths?.mobile_width || '';
  const ctasTabletWidth             = settings.widths?.tablet_width || '';
  const ctasDesktopWidth            = settings.widths?.desktop_width || '';

  const widths                      = `${ctasMobileWidth} ${ctasTabletWidth} ${ctasDesktopWidth}`;
  
  const ctas                        = settings.item;
  
  const ctaTitles = ctas ? ctas.map((cta) => {
    return cta.title
      .toLowerCase()
      .replaceAll(/[^\w\s-]/gi, '')
      .replaceAll(/\s+/g, '-')
      .replaceAll(/-+/g, '-')
      .replaceAll(/^-|-$/g, '');
  }).filter(Boolean).join('--') : [];

  const sectionTitleHasContent      = sectionTitle || sectionText || sectionHasButton;

  const sectionHasContent           = sectionTitleHasContent || ctas;

  if (!sectionHasContent) return null;

  const sectionIDString            = `ctas--section--${sectionTitle}--${sectionText}--${sectionButtonText}--${ctaTitles}`;
  const sectionID = 
    sectionIDString
      .toLowerCase()
      .replaceAll(/[^\w\s-]/gi, '')
      .replaceAll(/\s+/g, '-')
      .replaceAll(/-+/g, '-')
      .replaceAll(/^-|-$/g, '');

  if (sectionCustomCSS) {
    sectionCustomCSS = 
      sectionCustomCSS
        .replaceAll('==', '.' + sectionID)
        .replaceAll(';;', '##')
        .replaceAll(';', '!important;')
        .replaceAll('##', ';')
  }
  
  return (
    <section
      className={`ctas ${sectionID}`} 
    >
      <div className="page-width">

        {sectionCustomCSS ? (
          <style>{`
            ${sectionCustomCSS}
          `}</style>
        ) : null }

        {sectionTitleHasContent ? (

          <div className="section--title text-center">
            { sectionTitle ? (
              <h2 className="h1">{sectionTitle}</h2>
            ) : null }

            { sectionText ? (
              <div className="rte">
                <TinaMarkdown content={sectionText} />
              </div>
            ) : null }

            { sectionHasButton ? (
              <Link 
                href={sectionButtonLink} 
                className="button button--gradient"
              >
                <span>{sectionButtonText}</span>
              </Link>
            ) : null }

          </div>
        ) : null }
        

        {ctas ? (
          <div className="cell center ">
            {ctas.map((item, index) => {

              const image               = item.src || null;
              const imageAlt            = item.alt || null;
              const title               = item.title || null;
              let text                  = item.text || null;
              if (text && text.children.length === 0) {
                text                    = null; 
              }
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

              const itemIDString        = `ctas--item--${image}-${imageAlt}-${title}`;
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
                <div key={index} className={`cell__item ${widths} text-center`}>
                  <div className={`ctas--item ${itemID}`}>
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
                      <div className="ctas--text">
                        
                        { title ? (
                          <h3 className="h2">{title}</h3>
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
                </div>
              );
            })}
          </div>
        ) : null }

      </div>
    </section>
  );
};

export default CTAs;
