// pages/api/list-files.js

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const directory = './public/uploads'; // Adjust the path as per your project structure

  console.log('FUCK')
  try {
    const files = await fs.promises.readdir(directory);
    const fileList = files.map(filename => ({
      filename,
      url: `/uploads/${filename}`, // Adjust the URL path as needed
    }));
    res.status(200).json(fileList);
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ error: 'Failed to list files' });
  }
}
