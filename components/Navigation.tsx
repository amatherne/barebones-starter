// Navigation.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface MenuItem {
  label: string;
  url: string;
  subitems?: MenuItem[];
}

interface NavigationProps {
  menuData: MenuItem[] | string; // Allow menuData to be either MenuItem array or string
}

const Navigation = ({ menuData }: NavigationProps) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        let jsonData: MenuItem[] | null = null;

        if (typeof menuData === 'string') {
          // Fetch JSON data from the server
          const response = await fetch(menuData);
          if (response.ok) {
            jsonData = await response.json();
          } else {
            throw new Error('Failed to fetch menu data');
          }
        } else {
          // If menuData is already an array
          jsonData = menuData;
        }

        if (jsonData) {
          setMenuItems(jsonData);
        }
      } catch (error) {
        console.error(`Error loading menu data: ${error}`);
      }
    };

    fetchMenuData();
  }, [menuData]);

  console.log(menuData)

  // return (
  //   <nav>
  //     <ul>
  //       {menuItems.map((item) => (
  //         <li key={item.label}>
  //           <Link href={item.url}>
  //             {item.label}
  //           </Link>
  //           {item.subitems && item.subitems.length > 0 && (
  //             <ul>
  //               {item.subitems.map((subitem) => (
  //                 <li key={subitem.label}>
  //                   <Link href={subitem.url}>
  //                     {subitem.label}
  //                   </Link>
  //                 </li>
  //               ))}
  //             </ul>
  //           )}
  //         </li>
  //       ))}
  //     </ul>
  //   </nav>
  // );
};

export default Navigation;
