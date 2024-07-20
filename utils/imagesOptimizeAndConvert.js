const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const sharp = require('sharp');

const srcDir = path.resolve(__dirname, '../public/uploads');
const outputDir = path.resolve(__dirname, '../app/components/images/uploads');

// Function to convert a string to camel case
const convertFileNameToCamelCase = (str) => {
  return str
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')    // Replace spaces with hyphens
    .replace(/-+/g, '-')     // Replace multiple hyphens with a single hyphen
    .toLowerCase()           // Convert to lowercase
    .split('-')              // Split by hyphens
    .map((word, index) =>     // Capitalize first letter of each word except the first one
      index === 0
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');               // Join words to form camel case
};

// Function to clear the output directory
const clearOutputDir = async () => {
  try {
    if (fs.existsSync(outputDir)) {
      await fs.emptyDir(outputDir); // Remove all files and directories inside outputDir
      console.log('Output directory cleared.');
    } else {
      console.log('Output directory does not exist. Creating it.');
      await fs.ensureDir(outputDir); // Create directory if it does not exist
    }
  } catch (error) {
    console.error('Error clearing output directory:', error);
  }
};

// Function to process image files and generate a JSON file with image metadata
async function processImages() {
  try {
    console.log('Start processing images');

    // Clear the output directory
    await clearOutputDir();

    // Find all image files in the source directory
    const pattern = `${srcDir}/**/*.{jpg,jpeg,png,gif}`;
    const files = glob.sync(pattern);

    if (files.length === 0) {
      console.log('No image files found.');
      return;
    }

    // Initialize an array to hold image metadata
    const imageMetadata = [];

    // Process each image file
    await Promise.all(
      files.map(async (file) => {
        try {
          const fileName = path.basename(file);
          const componentName = convertFileNameToCamelCase(fileName);
          const image = sharp(file);

          // Get image metadata
          const metadata = await image.metadata();

          // Add image metadata to array
          imageMetadata.push({
            componentName,
            src: file.replace(srcDir, '/uploads'), // Adjust the path as needed
            width: metadata.width,
            height: metadata.height,
          });
          
        } catch (fileError) {
          console.error('Error processing file:', file, fileError);
        }
      })
    );

    // Write image metadata to a JSON file
    const outputPath = path.join(outputDir, 'imageMetadata.json');
    await fs.writeJson(outputPath, imageMetadata, { spaces: 2 });

    console.log('Image files processed and metadata generated successfully!');
  } catch (error) {
    console.error('Error processing image files:', error);
  }
}

processImages();
