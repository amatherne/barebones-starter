// ../svgsOptimizeAndConvert.js

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
    // Replace spaces and special characters with hyphens

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

// Function to process SVG files and generate React components
async function processSVGs() {
  try {
    console.log('Start processing SVGs');

    // Ensure output directory exists
    await fs.ensureDir(outputDir);
    console.log('Ensured output directory exists');

    // Find all SVG files in the source directory
    const pattern = `${srcDir}/**/*.svg`;
    console.log('Using pattern:', pattern);
    const files = glob.sync(pattern);
    console.log('Found SVG files:', files);

    if (files.length === 0) {
      console.log('No SVG files found.');
      return;
    }

    // Process each SVG file
    await Promise.all(
      files.map(async (file) => {
        console.log('Processing file:', file);

        try {
          const svgData = await fs.readFile(file, 'utf8');
          const fileName = path.basename(file, '.svg');
          const componentName = convertToCamelCase(fileName);

          // Optimize SVG data
          const optimizedSvg = optimize(svgData, { ...svgoConfig }).data;

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
          await fs.writeFile(path.join(outputDir, `${componentName}.tsx`), componentTemplate);
          console.log(`Processed: ${file}`);
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
