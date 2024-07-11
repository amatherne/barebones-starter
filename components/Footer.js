// ../components/Footer.js

import React from 'react';
import Navigation from '../components/Navigation';
import Globals from "../content/global_settings/global.json";

const Footer = () => {

  return (
    <footer>

      <Navigation key="footerMenu" menuData={Globals.footer_menu} />

    </footer>
  );
};

export default Footer;