// ../utils/imagesOptimizeAndConvert

'use strict';

const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');
const gm = require('gm').subClass({ imageMagick: true });
const glob = require('glob');
const { convertFileNameToCamelCase } = require('./helpers');
const { promisify } = require('util');

const inputDir = './public/uploads';
const outputDir = './public/media'; // cannot be /public/images. it gets deleted every time for some reason.
const parentDir = path.dirname(outputDir);

require('dotenv').config();

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const resize = promisify(gm().resize.bind(gm()));
const write = promisify(gm().write.bind(gm()));

console.log('\n{Image Optimize :: Start}\n');


const normalizeFileName = (fileName) => fileName.toLowerCase().replace(/[^a-z0-9]/g, '');

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

const checkFileName = async (files, fileNameWithoutExt) => {
  const normalizedMap = new Map();

  for (const file of files) {
    const fileName = path.basename(file, path.extname(file));
    const normalizedFileName = normalizeFileName(fileName);

    normalizedMap.set(normalizedFileName, file);

    if (normalizedFileName !== '' && normalizedFileName === normalizeFileName(fileNameWithoutExt)) {
      console.log(`{Image Optimize :: Check File Name} -- Already Exists: '${fileNameWithoutExt}'`);
      return false; 
    }
  }

  console.log(`{Image Optimize :: Check File Name} -- Does Not Exist: '${fileNameWithoutExt}'`);
  return true; 
};

const createImages = async (filePath) => {
  const extname = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  const fileNameWithoutExt = path.basename(convertFileNameToCamelCase(fileName), extname);

  const outputFiles = await getFilesInDirectories(outputDir);

  const isUnique = await checkFileName(outputFiles, fileNameWithoutExt);
  if (!isUnique) {
    return; 
  }

  try {
    const sizes = [
      { width: 500, height: 250 },
      { width: 1000, height: 500 },
      { width: 2000, height: 1000 },
      { width: 3000, height: 1500 },
    ];

    const gmInstance = gm(filePath);

    const resizedFileName = `${fileNameWithoutExt}.webp`;
    const resizedFilePath = path.join(outputDir, resizedFileName);
    await promisify(gmInstance.quality(75).write.bind(gmInstance))(resizedFilePath);
    console.log(`{Image Optimize :: Create Images}   -- Creating Image: '${resizedFileName}'`);

    const resizePromises = sizes.map(async (size) => {
      const resizedFileNameSizes = `${fileNameWithoutExt}-${size.width}x${size.height}.webp`;
      const resizedFilePathSizes = path.join(outputDir, resizedFileNameSizes);
      const gmInstanceSize = gm(filePath);
      await promisify(gmInstanceSize.resize(size.width, size.height).quality(75).write.bind(gmInstanceSize))(resizedFilePathSizes);
    });

    await Promise.all(resizePromises);
    console.log(`{Image Optimize :: Create Images}   -- Image Created:  '${resizedFileName}'`);

  } catch (error) {
    console.error(`{Image Optimize :: Create Images}   -- Error: ${filePath}:`, error);
  }
};

const processImage = async (filePath) => {
  await createImages(filePath);
};

const processAllImages = async () => {
  const pattern = `${inputDir}/**/*.{jpg,jpeg,png,webp,gif}`;
  const files = glob.sync(pattern);

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

if (process.env.WATCHING === 'true') {
  
  const watcher = chokidar.watch(inputDir, {
    ignored: [/^\./, /\.svg$/], 
    persistent: true,
    awaitWriteFinish: true, 
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
  processAllImages();
}
