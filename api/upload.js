// ../api/upload.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const formData = new FormData();
    formData.append('file', req.body.file); // Assuming 'file' is the key sent from TinaCMS

    // Replace with your actual upload logic (e.g., storing in cloud storage)
    // For demonstration, this simply returns a mock URL
    const url = `/uploads/${req.body.file.name}`;

    res.status(200).json({ url }); // Return the URL to be stored in TinaCMS
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
}
