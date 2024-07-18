// ../svgsOptimizeAndConvert.js

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const { optimize } = require('svgo');
const svgoConfig = require('../svgo.config');

const srcDir = path.join(__dirname, '../public/uploads');
const outputDir = path.resolve(__dirname, '../app/components/icons/uploads');

// Function to convert a string to camel case
const convertToCamelCase = (str) => {
  return str
    .split('-')
    .map((word, index) => (index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()))
    .join('');
};

// Function to process SVG files and generate React components
async function processSVGs() {
  try {

    // Ensure output directory exists
    await fs.ensureDir(outputDir);

    // Find all SVG files in the source directory
    const files = glob.sync(`${srcDir}/**/*.svg`);

    if (files.length === 0) {
      return;
    }

    // Process each SVG file
    await Promise.all(
      files.map(async (file) => {

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
  ${optimizedSvg}
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
