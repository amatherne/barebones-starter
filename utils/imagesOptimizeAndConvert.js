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
  const filePathAdjusted = filePath;
  const fileName = path.basename(filePathAdjusted);
  const newSrc = path.basename(convertFileNameToCamelCase(filePathAdjusted));

  try {
    console.log(`Start processing ${fileName}`);

    // console.log(`File: ${filePathAdjusted}`);
    // Check if the file exists
    if (!fs.existsSync(filePathAdjusted)) {
      console.error(`File does not exist: ${filePathAdjusted}`);
      return;
    }

    console.log(filePathAdjusted)

    // Get image dimensions
    const metadata = await readMetadata(filePathAdjusted);
    const { width, height } = metadata[''][0] || {};

    if (!width || !height) {
      console.error(`Unable to retrieve dimensions for ${filePathAdjusted}`);
      return;
    }

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
      const gmInstance = gm(filePathAdjusted);

      // Resize and convert to webp format
      // await gmInstance.resize(size.width, size.height).quality(75).write(resizedFilePath);
      await promisify(gmInstance.resize(size.width, size.height).quality(75).write.bind(gmInstance))(resizedFilePath);

      // console.log(`Created ${resizedFileName}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePathAdjusted}:`, error);
  }
};

// Function to process all image files
const processAllImages = async () => {
  const pattern = `${inputDir}/**/*.{jpg,jpeg,png,webp}`;
  // const pattern = `${inputDir}/**/*.{jpg,jpeg,png,webp}`;
  const files = glob.sync(pattern);

  // Clear the output directory
  await clearOutputDir(outputDir);

  if (files.length === 0) {
    console.log('No image files found.');
    return;
  }

  // Check for closely named files before processing
  // checkForSimilarFileNames(files);

  // Process each image file found
  for (const filePath of files) {
    await optimizeAndRenameImage(filePath);
  }
};

// Run the image processing
processAllImages().catch(error => {
  console.error('Error during image processing:', error);
});
