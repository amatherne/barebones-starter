// ../components/blocks/ctas.tsx

import React from 'react';
import sanitizeHtml from 'sanitize-html';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';
import ImgOutput from '../utilities/img';
import { formatUrl } from '../utilities/formatUrl';
import Link from 'next/link';
import { convertFileNameToCamelCase, customCSS } from '../../../utils/helpers';

interface Button {
  text?: string;
  url?: string;
  content?: string;
}

interface CTAItem {
  src?: string;
  alt?: string;
  title?: string;
  text?: TinaMarkdownContent;
  button?: Button;
  custom_css?: string;
}

interface Settings {
  title?: string;
  text?: TinaMarkdownContent;
  button?: Button;
  custom_css?: string;
  widths?: {
    mobile_width?: string;
    tablet_width?: string;
    desktop_width?: string;
  };
  alignments?: {
    title_alignment?: {
      mobile_text_align?: string;
      tablet_text_align?: string;
      desktop_text_align?: string;
    };
    cta_item_alignment?: {
      mobile_text_align?: string;
      tablet_text_align?: string;
      desktop_text_align?: string;
    };
    cta_content_alignment?: {
      mobile_text_align?: string;
      tablet_text_align?: string;
      desktop_text_align?: string;
    };
  };
  item?: CTAItem[];
  styles?: {
    style?: string;
    colors?: string;
  };
}

interface CTAsProps {
  settings?: Settings;
  index: number;
}

const CTAs: React.FC<CTAsProps> = ({ settings, index }) => {
  if (!settings) return null;

  const sectionTitle = settings.title || null;

  let sectionText: TinaMarkdownContent | undefined = settings.text;
  if (sectionText && sectionText.children.length === 0) {
    sectionText = undefined; 
  }

  const sectionButtonText = settings.button?.text || '';
  const sectionButtonUrl = settings.button?.url || '';
  const sectionButtonContent = settings.button?.content || '';

  let sectionButtonLink: string = sectionButtonUrl;
  if (sectionButtonContent) {
    sectionButtonLink = formatUrl(sectionButtonContent);  
  }
  const sectionHasButton = sectionButtonText && sectionButtonLink;

  let sectionCustomCSS = settings.custom_css || '';

  const ctasMobileWidth = settings.widths?.mobile_width || '';
  const ctasTabletWidth = settings.widths?.tablet_width || '';
  const ctasDesktopWidth = settings.widths?.desktop_width || '';

  const widths = `${ctasMobileWidth} ${ctasTabletWidth} ${ctasDesktopWidth}`;
  
  const ctas = settings.item;

  const ctaTitles = ctas ? ctas.map((cta) => {
    const title = cta.title || '';
    return convertFileNameToCamelCase(title);
  }).filter(Boolean).join('--') : [];

  const sectionTitleHasContent = sectionTitle || sectionText || sectionHasButton;
  const sectionHasContent = sectionTitleHasContent || ctas;

  if (!sectionHasContent) return null;

  const style = settings.styles?.style;
  const color = settings.styles?.colors;

  const sectionIDString = `ctas--section${sectionTitle ? '-' + sectionTitle : ''}${sectionButtonText ? '-' + sectionButtonText : ''}${ctaTitles ? '-' + ctaTitles : ''}`;
  const sectionID = convertFileNameToCamelCase(sectionIDString);

  if (sectionCustomCSS) {
    sectionCustomCSS = customCSS(sectionCustomCSS, sectionID);
  }

  const alignClassesTitle = settings.alignments?.title_alignment ? `
    ${settings.alignments?.title_alignment?.mobile_text_align}
    ${settings.alignments?.title_alignment?.tablet_text_align}
    ${settings.alignments?.title_alignment?.desktop_text_align}
  `.trim().replace(/(\r\n|\n|\r)/gm, "") : '';

  const alignClassesCtaItems = settings.alignments?.cta_item_alignment ? `
    ${settings.alignments?.cta_item_alignment?.mobile_text_align}
    ${settings.alignments?.cta_item_alignment?.tablet_text_align}
    ${settings.alignments?.cta_item_alignment?.desktop_text_align}
  `.trim().replace(/(\r\n|\n|\r)/gm, "") : '';

  const alignClassesCtaContent = settings.alignments?.cta_content_alignment ? `
    ${settings.alignments?.cta_content_alignment?.mobile_text_align}
    ${settings.alignments?.cta_content_alignment?.tablet_text_align}
    ${settings.alignments?.cta_content_alignment?.desktop_text_align}
  `.trim().replace(/(\r\n|\n|\r)/gm, "") : '';

  
  return (
    <section
      className={`ctas ${sectionID} ${style} ${color}`} 
    >
      <div className="page-width">

        {sectionCustomCSS ? (
          <style dangerouslySetInnerHTML={{ __html: sectionCustomCSS }} />
        ) : null }

        {sectionTitleHasContent ? (

          <div className={`section--title ${alignClassesTitle}`} >
            { sectionTitle ? (
              <h2 className="h1" dangerouslySetInnerHTML={{ __html: sanitizeHtml(sectionTitle) }} />
            ) : null }

            <div  />


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
          <ul className={`cell ${alignClassesCtaItems}`} >
            {ctas.map((item, index) => {

              const image = item.src || null;
              const imageAlt = item.alt || undefined;
              const title = item.title || null;
              let text: TinaMarkdownContent | undefined = item.text || undefined;
              if (text && text.children.length === 0) {
                text = undefined; 
              }
              const buttonText = item.button?.text || '';
              const buttonUrl = item.button?.url || '';
              const buttonContent = item.button?.content || '';

              let buttonLink: string = buttonUrl;
              if (buttonContent) {
                buttonLink = formatUrl(buttonContent);  
              }

              let blockCustomCSS = item.custom_css || '';

              const hasButton = buttonText && buttonLink;
              const hasOverlayLink = !hasButton && buttonLink;

              const linkTitle: string = title || (typeof text === 'string' ? text : imageAlt || '');

              const hasContent = title || text || hasButton;

              const itemIDString = `ctas--item${image ? '-' + image : ''}${imageAlt ? '-' + imageAlt : ''}${title ? '-' + title : ''}-${index}`;
              const itemID = convertFileNameToCamelCase(itemIDString);

              if (blockCustomCSS) {
                blockCustomCSS = customCSS(blockCustomCSS);
              }

              return (
                <li key={index} className={`cell__item ${widths} ${itemID}`}>
                  <div className={`ctas--item  ${alignClassesCtaContent}`}>
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
                          <h3 className="h2" dangerouslySetInnerHTML={{ __html: sanitizeHtml(title) }} />
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

                    {blockCustomCSS ? (
                      <style dangerouslySetInnerHTML={{ __html: blockCustomCSS }} />
                    ) : null }

                  </div>
                </li>
              );
            })}
          </ul>
        ) : null }

      </div>
    </section>
  );
};

export default CTAs;
