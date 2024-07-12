// ../components/Head/Head.tsx

import React from 'react';
import Globals from "../../content/global_settings/global.json";
import HeadStyles from './HeadStyles';

interface HeadProps {
  seoTitle: string;
  seoText: string;
}

const Head: React.FC<HeadProps> = ({ seoTitle: pageSeoTitle, seoText: pageSeoText }) => {
  const globalSeoTitle = Globals.seo_title;
  const globalSeoText = Globals.seo_text;

  const escapeHtml = (unsafeText: string) => {
    return unsafeText.replace(/[&<"']/g, (match) => ({
      '&': '&amp;',
      '<': '&lt;',
      '"': '&quot;',
      "'": '&#x27;',
    }[match]));
  };

  const seoTitle = pageSeoTitle.length > 0 ? pageSeoTitle + ' | ' + globalSeoTitle : globalSeoTitle;
  const seoText = pageSeoText.length > 0 ? pageSeoText : globalSeoText;

  return (
    <>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="theme-color" content="" />
      <title>{seoTitle}</title>
      <meta name="description" content={escapeHtml(seoText)} />
      <HeadStyles />
    </>
  );
};

export default Head;
