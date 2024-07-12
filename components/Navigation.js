// ../components/Navigation.js

import React from 'react';
import Link from 'next/link';

const Navigation = ({ menuData }) => {
  const renderMenuItems = (items) => {
    return (
      <ul>
        {items.map((item) => {

          let contentUrl = '';
          if (item.content) {
            contentUrl = item.content
                            .replace('content/page', '')
                            .replace('content', '')
                            .replace('.mdx', '')
                            .replace('.md', '');
          }
          
          const url = contentUrl || item.url;

          return (
            <li key={item.label}>
              <Link href={url}>
                {item.label}
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
    <nav>
      {renderMenuItems(menuData)}
    </nav>
  );
};

export default Navigation;
