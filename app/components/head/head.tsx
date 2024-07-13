// ../components/Head/Head.tsx

import React from 'react';
import Globals from "../../../content/global_settings/global.json";
import HeadStyles from '../head/headstyles';

import '../../../utils/index.js'

interface HeadProps {
  seoTitle?: string;
  seoText?: string;
}

const Head: React.FC<HeadProps> = ({ seoTitle, seoText }) => {
  const globalSeoTitle = Globals.seo_title || '';
  const globalSeoText = Globals.seo_text || '';

  const escapeHtml = (unsafeText: string = ''): string => {
    return unsafeText.replace(/[&<"']/g, (match) => ({
      '&': '&amp;',
      '<': '&lt;',
      '"': '&quot;',
      "'": '&#x27;',
    }[match] || match));
  };

  const finalSeoTitle = seoTitle && seoTitle.length > 0 ? `${seoTitle} | ${globalSeoTitle}` : globalSeoTitle;
  const finalSeoText = seoText && seoText.length > 0 ? seoText : globalSeoText;

  return (
    <>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="theme-color" content="" />
      <title>{finalSeoTitle}</title>
      <meta name="description" content={escapeHtml(finalSeoText)} />
      <HeadStyles />
    </>
  );
};

export default Head;
