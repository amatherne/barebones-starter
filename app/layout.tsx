// ../app/layout.tsx

'use client';

import HeadElement from './components/head/head';
import { TinaCMS, TinaProvider } from 'tinacms';
import React, { useMemo, useEffect } from 'react';
import Header from './components/header';
import Footer from './components/footer';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const cms = useMemo(() => {
    const cms = new TinaCMS();
    return cms;
  }, []);

  useEffect(() => {
  }, [cms]);

  return (
    <html lang="en">
      <HeadElement key="head" />
      <body>
        <TinaProvider cms={cms}>
          <span className="visually-hidden" id="Top">Top of Site</span>
          <a id="Top" className="skip-to-content-link button visually-hidden" href="#MainContent">
            Skip to Content
          </a>
          <Header key="header" />
          <main id="MainContent" className="focus-none" role="main" tabIndex={-1}>
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
