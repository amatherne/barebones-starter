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
const resize = promisify(gm().resize.bind(gm()));
const write = promisify(gm().write.bind(gm()));

// Function to process and resize image files
const optimizeAndRenameImage = async (filePath) => {
  const extname = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  const fileNameWithoutExt = path.basename(convertFileNameToCamelCase(fileName), extname);



  try {
    console.log(`Start processing ${fileName}`);

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
    // checkForSimilarFileNames(files);

    // Define sizes to create
    const sizes = [
      { width: 500, height: 250 },
      { width: 1000, height: 500 },
      { width: 2000, height: 1000 },
      { width: 3000, height: 1500 },
    ];

    // create default
    const resizedFileName = `${fileNameWithoutExt}.webp`;
    const resizedFilePath = path.join(outputDir, resizedFileName);

    // Create a new gm instance for each size
    const gmInstance = gm(filePath);

    // Resize and convert to webp format
    await promisify(gmInstance.quality(75).write.bind(gmInstance))(resizedFilePath);

    // console.log(`Created ${resizedFileName}`);

    // Resize and optimize each size
    for (const size of sizes) {
      const resizedFileNameSizes = `${fileNameWithoutExt}-${size.width}x${size.height}.webp`;
      const resizedFilePathSizes = path.join(outputDir, resizedFileNameSizes);

      // Create a new gm instance for each size
      const gmInstanceSize = gm(filePath);

      // Resize and convert to webp format
      await promisify(gmInstanceSize.resize(size.width, size.height).quality(75).write.bind(gmInstanceSize))(resizedFilePathSizes);

      // console.log(`Created ${resizedFileNameSizes}`);
    }
    // console.log(`And all ${resizedFileName} alternates`);

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