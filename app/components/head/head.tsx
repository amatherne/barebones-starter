// ../components/Head/Head.tsx

import React from 'react';
import Head from 'next/head';
import Globals from "../../../content/global_settings/global.json";

import '../../../styles/global.scss';

import '../../../utils/index.js'
import { finishedLoading } from '../../../utils/index.js'

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

  const finalSeoTitle = seoTitle && seoTitle.length > 0 ? `${seoTitle} | ${globalSeoTitle}` : globalSeoTitle;
  const finalSeoText = seoText && seoText.length > 0 ? seoText : globalSeoText;

  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="" />
        <title>{finalSeoTitle}</title>
        <meta name="description" content={escapeHtml(finalSeoText)} />
        
        <link rel="stylesheet" href="https://use.typekit.net/akz3yrt.css" {...({ precedence: "default" } as any)} />

        <style>{`
          @media screen and (min-width: 450px) {
            .header {
              position: fixed;
              top: 0;
            }
          }
        `}</style>

      </head>
    </>
  );
};

export default HeadElement;
