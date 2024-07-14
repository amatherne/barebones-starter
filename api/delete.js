// ../api/delete.js

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Replace with your actual logic to delete the file
    // For demonstration, this logs the deletion and returns a success message
    console.log(`Deleting file with ID: ${id}`);
    res.status(200).json({ message: `File with ID ${id} deleted successfully` });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
}
