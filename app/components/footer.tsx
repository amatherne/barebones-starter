// ../components/footer.tsx

import React from 'react';
import Navigation from '../components/navigation';
import Globals from "../../content/global_settings/global.json";

const Footer = () => {

  return (
    <>
      <footer className="footer section color--2">
        <div className="page-width">
          <div className="footer--sticky-section">

            <Navigation key="footerMenu" className="footer--menu" menuData={Globals.footer_menu} />
            
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;