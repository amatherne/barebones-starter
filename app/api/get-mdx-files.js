// ../app/api/get-mdx-files.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const contentDir = path.resolve('../../content/page/');
    const files = fs.readdirSync(contentDir).map(file => ({
      path: file,
      name: file.replace('.mdx', ''),
    }));
    console.log('Files:', files); // Check the files array
    res.status(200).json({ files });
  } catch (error) {
    console.error('Error reading files:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

