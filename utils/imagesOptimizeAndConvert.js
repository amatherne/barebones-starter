'use strict';

const fs = require('fs-extra');
const path = require('path');
const gm = require('gm').subClass({ imageMagick: true });
const glob = require('glob');
const chokidar = require('chokidar');
const { convertFileNameToCamelCase, checkForSimilarFileNames } = require('./helpers');
const { clearOutputDir } = require('./helpers--build-only');
const { promisify } = require('util');

const inputDir = './public/uploads';
const outputDir = './public/images';

require('dotenv').config();

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Promisify gm methods
const resize = promisify(gm().resize.bind(gm()));
const write = promisify(gm().write.bind(gm()));

console.log('\n\nStart processing Imgs\n\n');

// Function to process and resize image files
const optimizeAndRenameImage = async (filePath) => {
  const extname = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  const fileNameWithoutExt = path.basename(convertFileNameToCamelCase(fileName), extname);

  try {
    // Clear the output directory
    await clearOutputDir(outputDir);

    // Define sizes to create
    const sizes = [
      { width: 500, height: 250 },
      { width: 1000, height: 500 },
      { width: 2000, height: 1000 },
      { width: 3000, height: 1500 },
    ];

    // Create a new gm instance for each size
    const gmInstance = gm(filePath);

    // Resize and convert to webp format
    const resizedFileName = `${fileNameWithoutExt}.webp`;
    const resizedFilePath = path.join(outputDir, resizedFileName);
    await promisify(gmInstance.quality(75).write.bind(gmInstance))(resizedFilePath);

    // Resize and optimize each size
    const resizePromises = sizes.map(async (size) => {
      const resizedFileNameSizes = `${fileNameWithoutExt}-${size.width}x${size.height}.webp`;
      const resizedFilePathSizes = path.join(outputDir, resizedFileNameSizes);
      const gmInstanceSize = gm(filePath);
      await promisify(gmInstanceSize.resize(size.width, size.height).quality(75).write.bind(gmInstanceSize))(resizedFilePathSizes);
    });

    // Wait for all resize promises to complete
    await Promise.all(resizePromises);

  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
};

// Function to process a single image file
const processImage = async (filePath) => {
  await optimizeAndRenameImage(filePath);
};

// Process all image files in the input directory and its subdirectories
const processAllImages = async () => {
  // Find all image files in the source directory and its subdirectories
  const pattern = `${inputDir}/**/*.{jpg,jpeg,png,webp}`;
  const files = glob.sync(pattern);

  if (files.length === 0) {
    console.log('No image files found.');
    return;
  }

  // Check for closely named files before processing
  // checkForSimilarFileNames(files);

  const processingPromises = files.map(file => {
    return optimizeAndRenameImage(file);
  });

  await Promise.all(processingPromises);
  console.log('Img files processed and responsive versions created.\n\n');
};
  
// Conditionally start the file watcher based on environment
if (process.env.WATCHING === 'true') {

  // Watch for file changes and process new files
  const watcher = chokidar.watch(inputDir, {
    ignored: [/^\./, /\.svg$/],  // Ignore SVG files
    persistent: true,
  });

  watcher
    .on('add', filePath => {
      if (filePath.match(/\.(jpg|jpeg|png|webp)$/)) {
        console.log(`File ${filePath} has been added.`);
        processImage(filePath);
      }
    })
    .on('error', error => {
      console.error('Error watching files:', error);
    });

  console.log('Watching for new files...');

  process.on('SIGINT', () => {
    console.log('\n\nStopping file watcher...\n\n');
    watcher.close();
    process.exit();
  });

} else {
  // In production or other environments, process existing files
  processAllImages();
}
