// ../app/layout.tsx

'use client';

import { TinaCMS, TinaProvider } from 'tinacms';
import React, { useMemo, useEffect } from 'react';
import Head from './components/head/head';
import Header from './components/header';
import Footer from './components/footer';
import CustomMediaStore from '../utils/custom-media-store';
import TestMedia from './components/test-media';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const cms = useMemo(() => {
    const cms = new TinaCMS();
    cms.media.store = new CustomMediaStore();
    return cms;
  }, []);

  useEffect(() => {
    console.log('RootLayout mounted with cms:', cms);
  }, [cms]);

  return (
    <html lang="en">
      <Head key="head" />
      <body>
        <TinaProvider cms={cms}>
          <a id="Top" className="skip-to-content-link button visually-hidden" href="#MainContent">
            Skip to Content
          </a>
          <Header key="header" />
          <main id="MainContent" className="focus-none" role="main" tabIndex={-1}>
            <div style={{ padding: '20px', background: '#f0f0f0' }}>
              <TestMedia />
            </div>
            {children}
          </main>
          <Footer key="footer" />
          <a className="skip-to-content-link button visually-hidden" href="#Top">
            Back to Top
          </a>
        </TinaProvider>
      </body>
    </html>
  );
};

export default RootLayout;
