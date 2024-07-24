// ../app/layout.tsx

'use client';

import HeadElement from './components/head/head';
import { TinaCMS, TinaProvider } from 'tinacms';
import React, { useMemo, useEffect, useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import { ImageMetadataProvider } from './components/contexts/imageMetadataContext';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const [metadata, setMetadata] = useState({});

  const cms = useMemo(() => {
    const cms = new TinaCMS();
    return cms;
  }, []);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch('/api/metadata');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };

    fetchMetadata();
  }, []);

  return (
    <html lang="en">
      <HeadElement key="head" />
      <body>
        <TinaProvider cms={cms}>
          <ImageMetadataProvider metadata={metadata}>
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
          </ImageMetadataProvider>
        </TinaProvider>
      </body>
    </html>
  );
};

export default RootLayout;
