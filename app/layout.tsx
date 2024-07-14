// ../app/layout.tsx

'use client'; 

import { TinaCMS, TinaProvider } from 'tinacms';
import React from 'react';
import Head from './components/head/head';
import Header from './components/header';
import Footer from './components/footer';
// import CustomMediaStore from '../utils/custom-media-store';
import TinaCMSMediaSetup from './components/utilities/mediaSetup';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <Head key="head" />
      <body>
        <a id="Top" className="skip-to-content-link button visually-hidden" href="#MainContent">
          Skip to Content
        </a>
        <Header key="header" />
        <main id="MainContent" className="focus-none" role="main" tabIndex={-1}>
          <TinaCMSMediaSetup />
          {children}
        </main>
        <Footer key="footer" />
        <a className="skip-to-content-link button visually-hidden" href="#Top">
          Back to Top
        </a>
      </body>
    </html>
  );
};

export default RootLayout;
