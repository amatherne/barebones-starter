// ../app/ayout.tsx

'use client'; 

import React from 'react';
import Head from '../components/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';

// import '../styles/global.scss';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {

  return (
    <html lang="en">

      <Head key="head" seoTitle seoText />

      <body>
       
        <Header key="header"  />
        
        <main>{children}</main>

        <Footer key="footer"  />

      </body>
    </html>
  );
};

export default RootLayout;
