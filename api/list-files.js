// ../pages/api/list-files.js

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Directory where your uploaded files are stored
    const directoryPath = path.join(process.cwd(), 'public/uploads');

    // Read the directory
    const files = fs.readdirSync(directoryPath).map((file, index) => ({
      id: index + 1,
      filename: file,
      type: getFileType(file),
      url: `/uploads/${file}`,
    }));

    res.status(200).json(files);
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ error: 'Failed to list files' });
  }
}

function getFileType(filename) {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    // Add more cases for other file types as needed
    default:
      return 'application/octet-stream'; // Default to binary data if type is unknown
  }
}
