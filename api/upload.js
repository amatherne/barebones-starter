// ../api/upload.js

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const file = req.body.file; // Assuming 'file' is the key sent from TinaCMS
    const filePath = path.join(process.cwd(), 'public/uploads', file.name);

    // Save the file to the file system
    fs.writeFileSync(filePath, file.data);

    // Update 'files' array with the newly uploaded file information
    const newFile = {
      id: files.length + 1,
      filename: file.name,
      type: getFileType(file.name),
      url: `/uploads/${file.name}`,
    };
    files.push(newFile);

    res.status(200).json({ url: newFile.url }); // Return the URL to be stored in TinaCMS
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
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
