// ../app/components/navigation.tsx

import React from 'react';
import Link from 'next/link';
import activeLink from '../../utils/active-link'; 

const Navigation = ({ menuData, className }) => {
  const { isActive } = activeLink();

  const menuActive = 'menu--link--active';

  const renderMenuItems = (items) => {
    return (
      <ul className="list-unstyled">
        {items.map((item) => {
          
          let contentUrl = '';
          if (item.content) {
            contentUrl = 
              item.content
                .replace('content/page', '')
                .replace('content', '')
                .replace('.mdx', '')
                .replace('.md', '');
          }
          
          const url = contentUrl || item.url || '';

          return (
            <li key={item.text}>
              <Link href={url} className={`menu--link ${isActive(url) ? menuActive : ''}`}>
                <span>{item.text}</span>
              </Link>
              {item.subitems && item.subitems.length > 0 && renderMenuItems(item.subitems)}
            </li>
          );
        })}
      </ul>
    );
  };

  if (!menuData || menuData.length === 0) {
    return null; // Render nothing if menuData is empty or undefined
  }

  return (
    <nav className={`menu ${className}`}>
      {renderMenuItems(menuData)}
    </nav>
  );
};

export default Navigation;
