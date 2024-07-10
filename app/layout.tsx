'use client'; 

import React from 'react';
import Navigation from '../components/Navigation';
import Link from "next/link";
import Globals from "../content/global_settings/global.json";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const mainMenuPath = `../${Globals.main_menu}`;

  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/" title="Austin Matherne" className="logo--link">
            {Globals.logo ? (
              <img src={Globals.logo} alt="Logo" className="logo--image" />
            ) : 'Austin Matherne'}
          </Link>
          <Navigation key="mainMenu" menuData={mainMenuPath} />
        </header>
        <main>{children}</main>
        {/*<Navigation key="footerMenu" menuData={footerMenuPath} />*/}
      </body>
    </html>
  );
};

export default RootLayout;
