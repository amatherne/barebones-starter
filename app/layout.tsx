// app/layout.tsx

'use client';

import React, { ReactNode } from 'react';
import { TinaCMS, TinaProvider } from 'tinacms';
import Head from './components/head/head';
import Header from './components/header';
import Footer from './components/footer';
import CustomMediaStore from '../utils/custom-media-store';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const cms = new TinaCMS({
    media: new CustomMediaStore(),
    enabled: true,
  });

  return (
    <html lang="en">
      <Head key="head" />
      <body>
        <TinaProvider cms={cms}>
          <a id="Top" className="skip-to-content-link button visually-hidden" href="#MainContent">
            Skip to Content
          </a>
          <Header />
          <main id="MainContent" className="focus-none" role="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <a className="skip-to-content-link button visually-hidden" href="#Top">
            Back to Top
          </a>
        </TinaProvider>
      </body>
    </html>
  );
};

export default RootLayout;
