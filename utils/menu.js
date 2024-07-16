import { useEffect } from 'react';

function useMenuHandler() {
  useEffect(() => {
    const Body = document.body;
    const Menu = Body.querySelector('.header');
    const menuLinks = '.menu--link';
    const menuTrigger = '.menu-trigger';
    const MenuTriggers = Menu.querySelectorAll(`${menuTrigger}, .header--main-menu a, .logo`);
    const overlayLinks = '.header .overlay--link';
    const HideLinks = Menu.querySelectorAll(`${menuLinks}, ${overlayLinks}`);
    const menuOpenClass = 'header-menu-is-open';

    const handleMenuToggle = (event) => {
      // prevent the menu opening if you're clicking the logo,
      // but allow the logo to close menu if it already is open.
      const isLogo = (event.target.classList.contains('logo') || event.target.parentNode.classList.contains('logo'));
      if (!Menu.classList.contains(menuOpenClass) && isLogo) return;

      if (event.target.tagName === 'A' && event.target.getAttribute('href') === '#') {
        event.preventDefault();
      }

      menuToggle();
    };

    const toggleTabIndex = () => {
      const menuIsOpen = Body.classList.contains(menuOpenClass);
      HideLinks.forEach(link => {
        link.setAttribute('tabindex', menuIsOpen ? '' : '-1');
      });
    };

    const exitLinks = () => {
      const NavLinks = Menu.querySelectorAll(menuLinks);
      const OpenLink = Menu.querySelector(menuTrigger);

      const closeMenuIfLeaving = (event) => {
        const relatedTarget = event.relatedTarget;
        if (!relatedTarget || (!relatedTarget.classList.contains('menu--link') && relatedTarget !== OpenLink)) {
          menuToggle(false); // Close menu when leaving links
        }
      };

      NavLinks.forEach((link) => {
        link.addEventListener('blur', closeMenuIfLeaving);
        link.addEventListener('focusout', closeMenuIfLeaving);
      });

      const firstNavLink = NavLinks[0];
      const lastNavLink = NavLinks[NavLinks.length - 1];

      firstNavLink.addEventListener('keydown', (event) => {
        if (event.key === 'Tab' && event.shiftKey) {
          menuToggle();
        }
      });

      lastNavLink.addEventListener('keydown', (event) => {
        if (event.key === 'Tab' && !event.shiftKey) {
          menuToggle();
        }
      });

      return () => {
        NavLinks.forEach((link) => {
          link.removeEventListener('blur', closeMenuIfLeaving);
          link.removeEventListener('focusout', closeMenuIfLeaving);
        });
        firstNavLink.removeEventListener('keydown', handleMenuToggle);
        lastNavLink.removeEventListener('keydown', handleMenuToggle);
      };
    };

    const menuToggle = (toggle = true) => {
      if (toggle) {
        Body.classList.toggle(menuOpenClass);
      } else {
        Body.classList.remove(menuOpenClass);
      }
      toggleTabIndex();
    };

    toggleTabIndex();
    exitLinks();

    MenuTriggers.forEach((trigger) => {
      trigger.addEventListener('click', handleMenuToggle);
    });

    // Cleanup: Remove event listener on component unmount
    return () => {
      MenuTriggers.forEach((trigger) => {
        trigger.removeEventListener('click', handleMenuToggle);
      });
    };
  }, []); // Empty dependency array ensures this effect runs only once
}

export { useMenuHandler };
