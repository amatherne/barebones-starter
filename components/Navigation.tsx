'use client'; // Add this directive at the top


import Link from 'next/link';
import { useEffect, useState } from 'react';

interface MenuItem {
  label: string;
  url: string;
  subitems?: MenuItem[];
}

interface NavigationProps {
  menuData: MenuItem[]; // Define prop type for menuData
}

const Navigation = ({ menuData }: NavigationProps) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    setMenuItems(menuData);
  }, [menuData]); // Ensure useEffect runs when menuData changes

  return (
    <nav>
      <ul>
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link href={item.url}>
              {item.label}
            </Link>
            {item.subitems && item.subitems.length > 0 && (
              <ul>
                {item.subitems.map((subitem) => (
                  <li key={subitem.label}>
                    <Link href={subitem.url}>
                      {subitem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;