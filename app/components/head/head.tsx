// ../components/Head/Head.tsx

import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { clarity } from 'react-microsoft-clarity';
import Globals from '../../../content/global_settings/global.json';

import '../../../styles/global.scss';
import '../../../styles/components.scss';
import '../../../styles/sections.scss';

import { finishedLoading } from '../../../utils/index.js';

interface HeadProps {
  seoTitle?: string;
  seoText?: string;
}

const HeadElement: React.FC<HeadProps> = ({ seoTitle, seoText }) => {

  finishedLoading();

  const globalSeoTitle = Globals.seo_title || seoTitle || '';
  const globalSeoText = Globals.seo_text || seoText || '';


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

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;
    clarity.init('naukwulsi8');
  }, []);

  return (
    <>

      <Head><span /></Head>
  
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="theme-color" content="" />
      
      <title>{finalSeoTitle}</title>
      <meta name="description" content={escapeHtml(finalSeoText)} />  

      {/*<script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js" />*/}
      {/*<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js" />*/}

    </>
  );
};

export default HeadElement;

