// ../app/ayout.tsx

'use client'; 

import React from 'react';
import Head from '../components/Head/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {

  return (
    <html lang="en">

      <Head key="head" />

      <body>

        <a id="Top" className="skip-to-content-link button visually-hidden" href="#MainContent">Skip to Content</a>
       
        <Header key="header"  />
        
        <main id="MainContent" className="focus-none" role="main" tabIndex={-1}>{children}</main>

        <Footer key="footer"  />

        <a className="skip-to-content-link button visually-hidden" href="#Top">Back to Top</a>

      </body>
    </html>
  );
};

export default RootLayout;
