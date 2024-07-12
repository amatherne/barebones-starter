// ../components/Header.js

import React from 'react';
import Navigation from '../components/Navigation';
import Link from "next/link";
import Globals from "../content/global_settings/global.json";
import { Img } from '../components/Utilities/Img';


const Header = () => {

  return (
    <header className="header">

      <Link href="/" title={Globals.title} className="logo--link hxl">
        {Globals.logo ? (
          <Img src={Globals.logo} alt="Logo" className="logo--image" />
        ) : Globals.title }
      </Link>

      <Navigation key="mainMenu" menuData={Globals.main_menu} />

      {/*<code>
        <pre style={{ backgroundColor: "lightgray" }}>
          {JSON.stringify(Globals.main_menu, null, 2)}
        </pre>
      </code>*/}
      
    </header>
  );
};

export default Header;