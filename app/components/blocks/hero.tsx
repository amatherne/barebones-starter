// ../components/blocks/hero.tsx

import React from 'react';
import sanitizeHtml from 'sanitize-html';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';
import ImgOutput from '../utilities/img';
import { formatUrl } from '../utilities/formatUrl';
import Link from 'next/link';
import { convertFileNameToCamelCase, customCSS } from '../../../utils/helpers';

interface ButtonSettings {
  text?: string;
  url?: string;
  content?: string;
  mobile_button?: string;
  desktop_button?: string;
}

interface BlockStyles {
  mobile_colors?: string;
  mobile_opacity?: string;
  desktop_colors?: string;
  desktop_opacity?: string;
  custom_css?: string;
}

interface HeroItem {
  src?: string;
  alt?: string;
  title?: string;
  text?: TinaMarkdownContent;
  button?: ButtonSettings;
  styles?: BlockStyles;
}

interface HeroSettings {
  styles?: {
    height?: string;
    min_height?: string;
    max_height?: string;
  };
  item?: HeroItem[];
}

interface HeroProps {
  settings: HeroSettings;
  index: number;
}

const Hero: React.FC<HeroProps> = ({ settings, index }) => {

  const styles = settings.styles;
  const height = styles?.height || '';
  const min_height = styles?.min_height || '';
  const max_height = styles?.max_height || '';

  const hero = settings.item;

  const sectionIndex = index;

  if (!hero) return null;

  const heroStyle: React.CSSProperties & { [key: string]: string } = {
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

        const image = item.src || null;
        const imageAlt = item.alt || undefined;
        const title = item.title || null;
        let text = item.text;
        if (text && text.children.length === 0) {
          text = undefined; 
        }
        const buttonText = item.button?.text || '';
        const buttonUrl = item.button?.url || '';
        const buttonContent = item.button?.content || '';
        const buttonMobile = item.button?.mobile_button || '';
        const buttonDesktop = item.button?.desktop_button || '';

        let buttonLink: string = buttonUrl;
        if (buttonContent) {
          buttonLink = formatUrl(buttonContent);  
        }

        let isLazy = true;
        let titleElement = 'h2';
        if (index === 0 && sectionIndex === 0) {
          titleElement = 'h1';
          isLazy = false;
        }

        const blockStyles = item.styles;

        const mobileColors = blockStyles?.mobile_colors;
        const mobileOpacity = blockStyles?.mobile_opacity;

        const desktopColors = blockStyles?.desktop_colors;
        const desktopOpacity = blockStyles?.desktop_opacity;

        let blockCustomCSS = blockStyles?.custom_css || '';

        const hasButton = buttonText && buttonLink;
        const hasOverlayLink = !hasButton && buttonLink;

        const linkTitle: string = title || (typeof text === 'string' ? text : imageAlt || '');

        const hasContent = title || text || hasButton;

        const itemIDString = `hero--item${image ? '--' + image : ''}${imageAlt ? '--' + imageAlt : ''}${title ? '--' + title : ''}`;
        const itemID = convertFileNameToCamelCase(itemIDString);

        if (blockCustomCSS) {
          blockCustomCSS = customCSS(blockCustomCSS, itemID);
        }

        const blockStyle: React.CSSProperties & { [key: string]: string } = { 
          ...(mobileOpacity && { '--mobile--image--overlay-opacity': mobileOpacity }),
          ...(desktopOpacity && { '--desktop--image--overlay-opacity': desktopOpacity }),
        };

        const blockClass = `
          ${itemID} 
          ${mobileColors ? mobileColors : ''}
          ${desktopColors ? desktopColors : ''}
        `.trim();

        return (
          <div 
            key={index} 
            className={`hero--item ${blockClass}`}
            style={blockStyle}
          >
            {hasOverlayLink && buttonLink ? (
              <Link 
                href={buttonLink} 
                title={linkTitle} 
                className="overlay--link"
              ></Link>
            ) : null }

            {image ? (
              <ImgOutput src={image} alt={imageAlt} className="ctas--image" lazy={isLazy} />
            ) : null }

            {hasContent ? (
              <div className="page-width">
                <div className="hero--text">
                  
                  {title ? (
                    React.createElement(
                      titleElement, 
                      { 
                        className: "hxl",
                        dangerouslySetInnerHTML: { __html: sanitizeHtml(title) } 
                      }, 
                    )
                  ) : null}

                  {text ? (
                    <div className="rte">
                      <TinaMarkdown content={text} />
                    </div>
                  ) : null }

                  {hasButton ? (
                    <Link 
                      href={buttonLink} 
                      className={`button ${buttonMobile} ${buttonDesktop}`}
                    >
                      <span>{buttonText}</span>
                    </Link>
                  ) : null }

                </div>
              </div>
            ) : null }

            {blockCustomCSS ? (
              <style dangerouslySetInnerHTML={{ __html: blockCustomCSS }} />
            ) : null }

          </div>
        );
      })}
    </section>
  );
};

export default Hero;
