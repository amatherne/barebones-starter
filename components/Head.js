// ../components/Head.js

import React from 'react';
import Navigation from '../components/Navigation';
import Globals from "../content/global_settings/global.json";

const Head = ({ seoTitle: pageSeoTitle, seoText: pageSeoText }) => {
  const globalSeoTitle = Globals.seo_title;
  const globalSeoText = Globals.seo_text;

  // Function to escape special characters in HTML
  const escapeHtml = (unsafeText) => {
    return unsafeText.replace(/[&<"']/g, (match) => ({
      '&': '&amp;',
      '<': '&lt;',
      '"': '&quot;',
      "'": '&#x27;',
    }[match]));
  };

  const seoTitle  = pageSeoTitle ? pageSeoTitle + ' | ' + globalSeoTitle : globalSeoTitle;
  const seoText   = pageSeoText ? pageSeoText + ' | ' + globalSeoText : globalSeoText;

  return (
    <>

      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="theme-color" content="" />

      <title>{seoTitle}</title>

      {/*<meta name="description" content={escapeHtml(seoText)} />*/}
      <meta name="description" content={seoText} />

    </>
  );
};

export default Head;
