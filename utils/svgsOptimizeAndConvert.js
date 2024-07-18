const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const { optimize } = require('svgo');
const svgoConfig = require('../svgo.config');

const srcDir = path.resolve(__dirname, '../public/uploads');
const outputDir = path.resolve(__dirname, '../app/components/icons/uploads');

// Function to convert a string to camel case
const convertToCamelCase = (str) => {
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

// Function to check for closely named files
const checkForSimilarFileNames = (files) => {
  const normalizedMap = new Map();

  files.forEach((file) => {
    const fileName = path.basename(file, '.svg');
    const componentName = convertToCamelCase(fileName);
    const normalized = componentName.toLowerCase();

    if (normalizedMap.has(normalized)) {
      console.error(`\n\nError: Found closely named files: \n1: ${normalizedMap.get(normalized)} \n2: ${file}\n\n`);
      process.exit(1);
    } else {
      normalizedMap.set(normalized, file);
    }
  });
};

// Function to process SVG files and generate React components
async function processSVGs() {
  try {
    console.log('Start processing SVGs');

    // Clear the output directory
    await clearOutputDir();

    // Find all SVG files in the source directory
    const pattern = `${srcDir}/**/*.svg`;
    const files = glob.sync(pattern);

    if (files.length === 0) {
      console.log('No SVG files found.');
      return;
    }

    // Check for closely named files before processing
    checkForSimilarFileNames(files);

    // Process each SVG file
    await Promise.all(
      files.map(async (file) => {
        try {
          const svgData = await fs.readFile(file, 'utf8');
          const fileName = path.basename(file, '.svg');
          const componentName = convertToCamelCase(fileName);

          // Optimize SVG data
          const { data: optimizedSvg } = optimize(svgData, { ...svgoConfig });

          // Generate React component
          const componentTemplate = 
`
// ../app/components/icons/uploads/${componentName}.tsx

import React from 'react';

const ${componentName} = () => (
  ${optimizedSvg.replace(/xml:space="preserve"/g, '')}
);

export default ${componentName};
`;

          // Write component file
          const outputPath = path.join(outputDir, `${componentName}.tsx`);
          await fs.writeFile(outputPath, componentTemplate);
        } catch (fileError) {
          console.error('Error processing file:', file, fileError);
        }
      })
    );

    console.log('SVG files processed and React components generated successfully!');
  } catch (error) {
    console.error('Error processing SVG files:', error);
  }
}

processSVGs();
