const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
// const chokidar = require('chokidar');
const { optimize } = require('svgo');
const { convertFileNameToCamelCase, checkForSimilarFileNames } = require('./helpers');
// const { clearOutputDir } = require('./helpers--build-only');
const svgoConfig = require('../svgo.config');

const srcDir = path.resolve(__dirname, '../public/uploads');
const outputDir = path.resolve(__dirname, '../app/components/icons/uploads');

// Function to convert SVG attributes to camel case
const convertAttributesToCamelCase = (svgString) => {
  const hasFillOrStroke = /(fill|stroke)="[^"]*"/.test(svgString);

  const colorForeground = 'var(--color--foreground)';
  const colorBackground = 'var(--color--background)';

  if (!hasFillOrStroke) {
    svgString = svgString.replace(/<svg([^>]*?)(>)/, `<svg$1 fill="${colorForeground}"$2`);
  }

  svgString = svgString.replace(/(fill|stroke)="(black|#000000|#000|currentColor)"/g, `$1="${colorForeground}"`);
  svgString = svgString.replace(/(fill|stroke)="(white|#ffffff|#fff)"/g, `$1="${colorBackground}"`);

  return svgString
    .replace(/(\w+)-(\w+)(?=\s*=\s*['"])/g, (match, p1, p2) => `${p1}${p2.charAt(0).toUpperCase() + p2.slice(1)}`)
    .replace(/fill-rule/g, 'fillRule')
    .replace(/stroke-linecap/g, 'strokeLinecap')
    .replace(/stroke-linejoin/g, 'strokeLinejoin');
};

// Function to process a single SVG file
const processSingleSVG = async (filePath) => {
  try {
    const svgData = await fs.readFile(filePath, 'utf8');
    const fileName = path.basename(filePath);
    const componentName = convertFileNameToCamelCase(fileName);

    const { data: optimizedSvg } = optimize(svgData, { ...svgoConfig });

    const svgWithCamelCaseAttributes = convertAttributesToCamelCase(optimizedSvg);

    const componentTemplate = 
`
// ../app/components/icons/uploads/${componentName}.tsx

import React from 'react';

const ${componentName} = () => (
  ${svgWithCamelCaseAttributes.replace(/xml:space="preserve"/g, '')}
);

export default ${componentName};
`;

    const outputPath = path.join(outputDir, `${componentName}.tsx`);
    await fs.writeFile(outputPath, componentTemplate);
    console.log(`{svgsOptimizeAndConvert} -- SVG: '${fileName}' has been added.`)
  } catch (fileError) {
    console.error('{svgsOptimizeAndConvert} -- Error processing SVG:', filePath, fileError);
  }
};

// Function to process all SVG files
const processAllSVGs = async () => {
  try {
    console.log('\n{svgsOptimizeAndConvert} -- Start processing SVGs\n');

    console.log(`{svgsOptimizeAndConvert} -- process.env.WATCHING: ${process.env.WATCHING}`);
    if (process.env.WATCHING !== 'true') {
      // Clear the output directory
      // await clearOutputDir(outputDir);
    }

    const pattern = `${srcDir}/**/*.svg`;
    const files = glob.sync(pattern);

    if (files.length === 0) {
      console.log('{svgsOptimizeAndConvert} -- No SVG files found.');
      return;
    }

    // Check for closely named files before processing
    // checkForSimilarFileNames(files);

    await Promise.all(files.map(processSingleSVG));

    console.log('{svgsOptimizeAndConvert} -- SVG files processed and React components generated successfully!\n');
  } catch (error) {
    console.error('{svgsOptimizeAndConvert} -- Error processing SVG files:', error);
  }
};

// Conditionally start the file watcher based on environment
if (process.env.WATCHING === 'true') {
  // const watcher = chokidar.watch(srcDir, {
  //   ignored: [/^\./, /\.svg$/],
  //   persistent: true,
  //   awaitWriteFinish: true,
  // });

  // watcher
  //   .on('add', filePath => {
  //     if (filePath.match(/\.svg$/)) {
  //       console.log(`{svgsOptimizeAndConvert} -- SVG '${filePath}' has been added.`);
  //       processSingleSVG(filePath); // Process the single added file
  //     }
  //   })
  //   .on('change', filePath => {
  //     if (filePath.match(/\.svg$/)) {
  //       console.log(`{svgsOptimizeAndConvert} -- SVG '${filePath}' has been changed.`);
  //       processSingleSVG(filePath); // Process the single changed file
  //     }
  //   })
  //   .on('error', error => {
  //     console.error('{svgsOptimizeAndConvert} -- Error watching SVGs:', error);
  //   });

  // console.log('{svgsOptimizeAndConvert} -- Watching for new and changed SVGs...');

  // process.on('SIGINT', () => {
  //   console.log('\n{svgsOptimizeAndConvert} -- SVG watcher stopped...\n');
  //   watcher.close();
  //   process.exit();
  // });

} else {
  processAllSVGs();
}
