// ../components/footer.tsx

import React from 'react';
// import Navigation from '../components/navigation';
import Globals from "../../content/global_settings/global.json";

const Footer = () => {

  return (
    <>
      <footer className="footer section color--gradient">
        <div className="page-width">
          <div className="footer--sticky-section">
            {/*<Navigation key="footerMenu" className="footer--menu" menuData={Globals.footer_menu} />*/}
            <div className="footer--copyright text-center">
              <p>
                &copy; 2024 Austin Matherne.
                &nbsp;&nbsp;&nbsp;&nbsp;
                All rights reserved.
                <span className="md-up--hide"><br/></span>
                <span className="sm--hide">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <b><a href="mailto:austin.m.matherne@gmail.com">Contact Me!</a></b>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;