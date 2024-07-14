// ../utils/menu.js

import { useEffect } from 'react';

function useMenuHandler() {
  useEffect(() => {

    const Body              = document.body;

    const MenuTriggers      = '.menu-trigger,.header--main-menu a, .logo';
    const MenuOpenClass     = 'header-menu-is-open';

    const handleMenuToggle = (event) => {

      // prevent the menu opening if you're clicking the logo, 
      // but allow the logo to close menu if it already is open.
      const isLogo = (event.target.classList.contains('logo') || event.target.parentNode.classList.contains('logo'));
      if ( !Body.classList.contains(MenuOpenClass) && isLogo ) return;
      
      if ( event.target.tagName === 'A' && event.target.getAttribute('href') === '#' ) {
        event.preventDefault();
      }

      Body.classList.toggle(MenuOpenClass);
    };

    document.querySelectorAll(MenuTriggers).forEach((menuTrigger) => {
      menuTrigger.addEventListener('click', handleMenuToggle);
    });

    // Cleanup: Remove event listener on component unmount
    return () => {
      document.querySelectorAll(MenuTriggers).forEach((menuTrigger) => {
        menuTrigger.removeEventListener('click', handleMenuToggle);
      });
    };
  }, []); // Empty dependency array ensures this effect runs only once

}

export { useMenuHandler };
