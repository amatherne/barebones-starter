'use strict';

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const inputDir = './public/uploads';
const outputDir = './public/images';

const { convertFileNameToCamelCase, clearOutputDir, checkForSimilarFileNames } = require('./helpers');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to optimize and rename image files
const optimizeAndRenameImage = async (filePath) => {
  const extname = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  const fileNameWithoutExt = path.basename(filePath, extname);
  const newFileName = convertFileNameToCamelCase(fileNameWithoutExt) + extname;
  const outputFilePath = path.join(outputDir, newFileName);

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
    checkForSimilarFileNames(files);

    // Dynamically import the ES modules for image optimization
    const { default: imagemin } = await import('imagemin');
    const imageminMozjpeg = (await import('imagemin-mozjpeg')).default;
    const imageminPngquant = (await import('imagemin-pngquant')).default;
    const imageminWebp = (await import('imagemin-webp')).default;

    const plugins = [];

    if (['.jpg', '.jpeg'].includes(extname)) {
      plugins.push(imageminMozjpeg({ quality: 75 }));
    } else if (extname === '.png') {
      plugins.push(imageminPngquant({ quality: [0.6, 0.8] }));
    } else if (extname === '.webp') {
      plugins.push(imageminWebp({ quality: 75 }));
    }

    if (plugins.length > 0) {
      await imagemin([filePath], {
        destination: outputDir,
        plugins,
      });

      // Rename the optimized file to camel case
      await fs.rename(path.join(outputDir, fileName), outputFilePath);

      // console.log(`Optimized and renamed ${fileName} to ${newFileName}`);
    }
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error);
  }
};

// Process all image files in the input directory
fs.readdirSync(inputDir).forEach(file => {
  const filePath = path.join(inputDir, file);
  if (fs.statSync(filePath).isFile() && ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(filePath).toLowerCase())) {
    optimizeAndRenameImage(filePath);
  }
});
