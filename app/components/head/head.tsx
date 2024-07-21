// ../components/Head/Head.tsx

import React from 'react';
import Head from 'next/head';
import Globals from '../../../content/global_settings/global.json';
import '../../../styles/global.scss';
import '../../../styles/sections.scss';
import '../../../styles/components.scss';
import { finishedLoading } from '../../../utils/index.js'; 

interface HeadProps {
  seoTitle?: string;
  seoText?: string;
}

const HeadElement: React.FC<HeadProps> = ({ seoTitle, seoText }) => {

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
      
      {/*<link rel="stylesheet" href="https://use.typekit.net/akz3yrt.css" />*/}
{/*      <link rel="stylesheet" href="/_next/static/css/global.css" />
      <link rel="stylesheet" href="/_next/static/css/components.css" />
      <link rel="stylesheet" href="/_next/static/css/sections.css" />
      */}
      <script type="text/javascript">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "naukwulsi8");
        `}
      </script>

    </Head>
  );
};

export default HeadElement;

