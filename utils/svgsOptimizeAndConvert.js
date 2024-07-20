const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const { optimize } = require('svgo');
const { parseStringPromise, Builder } = require('xml2js');
const svgoConfig = require('../svgo.config');

const srcDir = path.resolve(__dirname, '../public/uploads');
const outputDir = path.resolve(__dirname, '../app/components/icons/uploads');

const { convertFileNameToCamelCase, clearOutputDir, checkForSimilarFileNames } = require('./helpers');

// Function to convert SVG attributes to camel case
const convertAttributesToCamelCase = (svgString) => {

  // console.log(svgString)

  // Regular expression to check for fill or stroke attributes in the entire SVG
  const hasFillOrStroke = /(fill|stroke)="[^"]*"/.test(svgString);

  const colorForeground = 'var(--color--foreground)';
  const colorBackground = 'var(--color--background)';

  // If neither fill nor stroke is found, add fill="colorForeground" to the main <svg> element
  if (!hasFillOrStroke) {
    svgString = svgString.replace(/<svg([^>]*?)(>)/, `<svg$1 fill="${colorForeground}"$2`);
  }

  // Replace #000000, #000, or black with ${colorForeground}
  svgString = svgString.replace(/(fill|stroke)="(black|#000000|#000|currentColor)"/g, `$1="${colorForeground}"`);

  // Replace #000000, #000, or black with ${colorBackground}
  svgString = svgString.replace(/(fill|stroke)="(white|#ffffff|#fff)"/g, `$1="${colorBackground}"`);


  return svgString
    // Convert SVG attribute names to camel case
    .replace(/(\w+)-(\w+)(?=\s*=\s*['"])/g, (match, p1, p2) => `${p1}${p2.charAt(0).toUpperCase() + p2.slice(1)}`)
    // Specific attributes that need camel casing
    .replace(/fill-rule/g, 'fillRule')
    .replace(/stroke-linecap/g, 'strokeLinecap')
    .replace(/stroke-linejoin/g, 'strokeLinejoin');
};

// Function to process SVG files and generate React components
async function processSVGs() {
  try {
    console.log('Start processing SVGs');

    // Clear the output directory
    await clearOutputDir(outputDir);

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
          const componentName = convertFileNameToCamelCase(fileName);

          // Optimize SVG data
          const { data: optimizedSvg } = optimize(svgData, { ...svgoConfig });

          // Convert attributes to camel case
          const svgWithCamelCaseAttributes = convertAttributesToCamelCase(optimizedSvg);

          // Generate React component
          const componentTemplate = 
`
// ../app/components/icons/uploads/${componentName}.tsx

import React from 'react';

const ${componentName} = () => (
  ${svgWithCamelCaseAttributes.replace(/xml:space="preserve"/g, '')}
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
