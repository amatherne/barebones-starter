'use client'; // Add this directive at the top

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface MenuItem {
  label: string;
  url: string;
  subitems?: MenuItem[]; // Optional subitems for nested menus
}

export const Navigation = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      // Replace with your actual data fetching logic
      const response = await fetch('/api/menus'); // Example API endpoint
      const data: MenuItem[] = await response.json();
      setMenuItems(data);
    };

    fetchMenuData();
  }, []);

  return (
    <>
      <header>
        {menuItems.map((item, index) => (
          <span key={item.label}>
            <Link href={item.url}>
              {item.label}
            </Link>
            {index < menuItems.length - 1 && ' | '}
          </span>
        ))}
      </header>
    </>
  );
};