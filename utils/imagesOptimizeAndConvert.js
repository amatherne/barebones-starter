// ../utils/imagesOptimizeAndConvert

'use strict';

const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');
const gm = require('gm').subClass({ imageMagick: true });
const glob = require('glob');
const { convertFileNameToCamelCase } = require('./helpers');
// const { clearOutputDir } = require('./helpers--build-only');
const { promisify } = require('util');

const inputDir = './public/uploads';
// const outputDir = './public/images';
const outputDir = './public/imagesTest';
const parentDir = path.dirname(outputDir);

require('dotenv').config();

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Promisify gm methods
const resize = promisify(gm().resize.bind(gm()));
const write = promisify(gm().write.bind(gm()));

console.log('\n{Image Optimize :: Start}\n');


// Function to get a list of files using glob patterns
const getFilesInDirectories = (inputDir) => {
  return new Promise((resolve, reject) => {
    glob(`${inputDir}/**/*.{jpg,jpeg,png,webp,gif}`, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
};

// Function to check for closely named files
const checkFileName = async (files, fileNameWithoutExt) => {
  const normalizedMap = new Map();
  const lowerCaseFileName = fileNameWithoutExt.toLowerCase();

  for (const file of files) {
    const fileName = path.basename(file, path.extname(file));
    // const componentName = convertFileNameToCamelCase(fileName);
    // const normalized = componentName.toLowerCase();

    // console.log('Normalized:', normalized,' // Current:', lowerCaseFileName);
    // console.log(`lowerCaseFileName`, lowerCaseFileName);
    // console.log(`fileName`, fileName);
    // console.log(`fileName === ''`, fileName === '');
    // console.log(`fileName === null`, fileName === null);

    if (fileName !== '' && fileName === lowerCaseFileName) {
      console.log(`{Image Optimize :: Check File Name} -- Already Exists: '${fileNameWithoutExt}' / Existing: '${fileName}'`);
      return false; // Similar file found, return false
    }

    // Update the map if no similar file is found
    normalizedMap.set(fileName, file);
  }

  console.log(normalizedMap)

  console.log(`{Image Optimize :: Check File Name} -- Does Not Exist: '${fileNameWithoutExt}'`);
  return true; // No similar file found
};

// Function to process and resize image files
const createImages = async (filePath) => {
  const extname = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  const fileNameWithoutExt = path.basename(convertFileNameToCamelCase(fileName), extname);

  // Get a list of all files in outputDir and parentDir
  const outputFiles = await getFilesInDirectories(outputDir);
  // const parentFiles = await getFilesInDirectories(parentDir);
  // const allFiles = [...outputFiles, ...parentFiles];

  // Check for closely named files in the output directory and its parent directory
  if (!checkFileName(outputFiles, fileNameWithoutExt)) {
    return; // Skip processing if a similar file is found
  }

  try {
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
    console.log(`{Image Optimize :: Create Images}   -- File added:     '${resizedFileName}'`);

    // Resize and optimize each size
    const resizePromises = sizes.map(async (size) => {
      const resizedFileNameSizes = `${fileNameWithoutExt}-${size.width}x${size.height}.webp`;
      const resizedFilePathSizes = path.join(outputDir, resizedFileNameSizes);
      const gmInstanceSize = gm(filePath);
      await promisify(gmInstanceSize.resize(size.width, size.height).quality(75).write.bind(gmInstanceSize))(resizedFilePathSizes);
      console.log(`{Image Optimize :: Create Images}   -- Resizing.......`);
    });

    // Wait for all resize promises to complete
    await Promise.all(resizePromises);
    console.log(`{Image Optimize :: Create Images}   -- Done:           '${resizedFileName}'`);

  } catch (error) {
    console.error(`{Image Optimize :: Create Images}   -- Error: ${filePath}:`, error);
  }
};

// Function to process a single image file
const processImage = async (filePath) => {
  await createImages(filePath);
};

// Process all image files in the input directory and its subdirectories
const processAllImages = async () => {
  // Find all image files in the source directory and its subdirectories
  const pattern = `${inputDir}/**/*.{jpg,jpeg,png,webp,gif}`;
  const files = glob.sync(pattern);

  // Filter out files that are in the outputDir
  const filteredFiles = files.filter(file => !file.startsWith(path.resolve(outputDir)));

  if (filteredFiles.length === 0) {
    console.log('{Image Optimize :: Process All Images} -- No image files found.');
    return;
  }

  const processingPromises = filteredFiles.map(file => {
    processImage(file);
  });

  await Promise.all(processingPromises);
  console.log('{Image Optimize :: Process All Images} -- All Images Processed.\n');
};

// Conditionally start the file watcher based on environment
if (process.env.WATCHING === 'true') {
  // Watch for file changes and process new files
  
  const watcher = chokidar.watch(inputDir, {
    ignored: [/^\./, /\.svg$/], // Ignore SVG files
    persistent: true,
    awaitWriteFinish: true, // Wait for the file to be fully written before triggering events
  });

  watcher
    .on('add', filePath => {
      if (filePath.match(/\.(jpg|jpeg|png|webp|gif)$/)) {
        processImage(filePath);
      } 
    })
    .on('error', error => {
      console.error('{Image Optimize :: Watcher} -- Error:', error);
    });

  console.log('{Image Optimize :: Watcher} -- Watching...');

  process.on('SIGINT', () => {
    console.log('\n{Image Optimize :: Watcher} -- Watcher stopped...\n');
    watcher.close();
    process.exit(1);
  });

} else {
  // In production or other environments, process existing files
  processAllImages();
}
