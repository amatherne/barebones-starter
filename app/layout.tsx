import React from 'react';
import Navigation from '../components/Navigation';
import mainMenu from '../content/menus/main-menu.json'; // Adjust path based on your directory structure

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Navigation menuData={mainMenu.items} />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;