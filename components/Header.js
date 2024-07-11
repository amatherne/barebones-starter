// ../components/Header.js

import React from 'react';
import Navigation from '../components/Navigation';
import Link from "next/link";
import Globals from "../content/global_settings/global.json";

const Header = ({ object }) => {

  return (
    <header>

      <Link href="/" title={Globals.title} className="logo--link">
        {Globals.logo ? (
          <img src={Globals.logo} alt="Logo" className="logo--image" />
        ) : Globals.title }
      </Link>

      <Navigation key="mainMenu" menuData={Globals.main_menu} />
      
    </header>
  );
};

export default Header;