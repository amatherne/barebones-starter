// ../app/api/get-mdx-files.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const contentDir = path.resolve('../../content/page');
  try {
    const files = fs.readdirSync(contentDir).map(file => ({
      path: file,
      name: file.replace('.mdx', ''),
    }));
    res.status(200).json({ files });
  } catch (error) {
    console.error('Error fetching MDX files:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
