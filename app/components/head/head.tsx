// ../components/Head/Head.tsx

import React, { useEffect } from 'react';
import Head from 'next/head';
import Globals from '../../../content/global_settings/global.json';
import '../../../styles/global.scss';
import { finishedLoading } from '../../../utils/index.js'; 

interface HeadProps {
  seoTitle?: string;
  seoText?: string;
}

const HeadElement: React.FC<HeadProps> = ({ seoTitle, seoText }) => {
  useEffect(() => {
    
    // Microsoft Clarity
    const clarityScript = document.createElement('script');
    clarityScript.type = 'text/javascript';
    clarityScript.async = true;
    clarityScript.src = 'https://www.clarity.ms/tag/naukwulsi8';
    document.head.appendChild(clarityScript);

    return () => {
      document.head.removeChild(clarityScript);
    };
  }, []);

  finishedLoading(); 

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

  const finalSeoTitle = seoTitle ? `${seoTitle} | ${globalSeoTitle}` : globalSeoTitle;
  const finalSeoText = seoText ? seoText : globalSeoText;

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="theme-color" content="" />
      <title>{finalSeoTitle}</title>
      <meta name="description" content={escapeHtml(finalSeoText)} />
      <link rel="stylesheet" href="https://use.typekit.net/akz3yrt.css" />
    </Head>
  );
};

export default HeadElement;

