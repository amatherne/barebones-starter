// lib/loadMenu.js
import fs from 'fs';
import path from 'path';

export const loadMenu = (menuPath) => {
  const fullPath = path.join(process.cwd(), menuPath);
  const menuData = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  return menuData;
};
