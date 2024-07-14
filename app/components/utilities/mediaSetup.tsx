// ../utils/mediaSetup.js

export async function getImageDimensions(src) {
  // Example: Fetch image dimensions using client-side or server-side logic
  try {
    const img = new Image();
    img.src = src;
    await img.decode(); // Ensure image is loaded
    return { width: img.width, height: img.height };
  } catch (error) {
    console.error('Error fetching image dimensions:', error);
    return { width: 0, height: 0 };
  }
}
