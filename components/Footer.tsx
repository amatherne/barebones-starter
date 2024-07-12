// ../components/Footer.tsx

import React from 'react';
import Navigation from '../components/Navigation';
import Globals from "../content/global_settings/global.json";

const Footer = () => {

  return (
    <footer className="footer">

      <Navigation key="footerMenu" className="" menuData={Globals.footer_menu} />

    </footer>
  );
};

export default Footer;