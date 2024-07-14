// ../api/delete.js

import fs from 'fs';
import path from 'path';

// Function to fetch files from the uploads directory
function fetchFiles() {
  const directoryPath = path.join(process.cwd(), 'public/uploads');

  try {
    // Read the directory
    const filenames = fs.readdirSync(directoryPath);

    // Map filenames to file objects
    return filenames.map((filename, index) => ({
      id: index + 1,
      filename: filename,
      type: getFileType(filename),
      url: `/uploads/${filename}`,
    }));
  } catch (error) {
    console.error('Error fetching files:', error);
    return [];
  }
}

// Initialize 'files' with fetched files
let files = fetchFiles();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Find the file to delete in 'files' array
    const deletedFile = files.find(file => file.id === parseInt(id));
    if (!deletedFile) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete file from the file system
    const filePath = path.join(process.cwd(), 'public/uploads', deletedFile.filename);
    fs.unlinkSync(filePath);

    // Update 'files' array after deletion
    files = files.filter(file => file.id !== parseInt(id));

    res.status(200).json({ message: `File with ID ${id} deleted successfully` });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Failed to delete file' });
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
