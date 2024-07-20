'use strict';

const fs = require('fs-extra');
const path = require('path');
const gm = require('gm').subClass({ imageMagick: true });
const glob = require('glob');
const { convertFileNameToCamelCase, checkForSimilarFileNames } = require('./helpers');
const { clearOutputDir } = require('./helpers--build-only');
const { promisify } = require('util');

const inputDir = './public/uploads';
const outputDir = './public/images';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Promisify gm methods
const readMetadata = promisify(gm().identify.bind(gm()));
const resize = promisify(gm().resize.bind(gm()));
const write = promisify(gm().write.bind(gm()));

// Function to process and resize image files
const optimizeAndRenameImage = async (filePath) => {
  const extname = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  const newSrc = path.basename(convertFileNameToCamelCase(filePath));

  try {
    console.log(`Start processing ${fileName}`);

    console.log(`filePath: ${filePath}`);
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File does not exist: ${filePath}`);
      return;
    }
    console.log(`filePath must exist? ${filePath}`);

    // Get image dimensions
    const metadata = await readMetadata(filePath);
    const { width, height } = metadata[''][0] || {};

    if (!width || !height) {
      console.error(`Unable to retrieve dimensions for ${filePath}`);
      return;
    }

    // Clear the output directory
    await clearOutputDir(outputDir);

    // Find all image files in the source directory
    const pattern = `${inputDir}/**/*.{jpg,jpeg,png,webp}`;
    const files = glob.sync(pattern);

    if (files.length === 0) {
      console.log('No image files found.');
      return;
    }

    // Check for closely named files before processing
    checkForSimilarFileNames(files);

    // Define sizes to create based on original dimensions
    const sizes = [
      { width: Math.floor(width * 0.25), height: Math.floor(height * 0.25) },
      { width: Math.floor(width * 0.5), height: Math.floor(height * 0.5) },
    ];

    // Resize and optimize each size
    for (const size of sizes) {
      const resizedFileName = `${newSrc}-${size.width}x${size.height}.webp`;
      const resizedFilePath = path.join(outputDir, resizedFileName);

      // Create a new gm instance for each size
      const gmInstance = gm(filePath);

      // Resize and convert to webp format
      await gmInstance.resize(size.width, size.height).quality(75).write(resizedFilePath);

      console.log(`Created ${resizedFileName}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
};

// Process all image files in the input directory
fs.readdirSync(inputDir).forEach(file => {
  const filePath = path.join(inputDir, file);
  if (fs.statSync(filePath).isFile() && ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(filePath).toLowerCase())) {
    optimizeAndRenameImage(filePath);
  }
});
