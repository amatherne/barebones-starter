// ../components/Header.js

import React, { useEffect } from 'react';
import Link from 'next/link';
import Globals from '../content/global_settings/global.json';
// import { Img } from '../components/Utilities/Img';
import Navigation from '../components/Navigation';
// import { wrapCharactersInSpan } from '../utils/helpers';
import { useMenuHandler } from '../utils/menu';
import MenuIcon from './Icons/MenuIcon';

const { wrapCharactersInSpan } = require('../utils/helpers');

const Header = () => {

  useMenuHandler(); 

  const textLogo = Globals.title ? wrapCharactersInSpan(Globals.title) : '';

  return (
    <header className="header">
      <div className="header--menu-panel">
        
        <Link href="/" title={Globals.title} className="logo">
          {Globals.logo ? (
            {/*<Img src={Globals.logo} alt="Logo" className="logo--image" />*/}
          ) : (
            textLogo
          )}
        </Link>

        <Link href="#" className="header--menu-icon menu-trigger">
          <span className="visually-hidden">Open Menu</span>
          <MenuIcon />
        </Link>

        {/* Add your navigation component here */}
         <Navigation key="mainMenu" className="header--main-menu" menuData={Globals.main_menu} /> 
      </div>

      <Link href="#" title="Close Menu" className="overlay overlay--link menu-trigger" />

    </header>
  );
};

export default Header;
