// ../optimize-svgs.js

const { optimize } = require('svgo');
const svgoConfig = require('./svgo.config'); // Adjust path as per your actual configuration file location
const fs = require('fs').promises;
const path = require('path');

// Function to optimize SVG files
async function optimizeSVGFiles() {
  try {
    // Read the directory and get SVG files
    const directoryPath = path.join(__dirname, 'public', 'svgs');
    const files = await fs.readdir(directoryPath);

    // Optimize each SVG file
    await Promise.all(
      files.map(async (file) => {
        if (file.endsWith('.svg')) {
          const filePath = path.join(directoryPath, file);
          const svgContent = await fs.readFile(filePath, 'utf8');
          const optimizedSvg = await optimize(svgContent, svgoConfig);
          await fs.writeFile(filePath, optimizedSvg.data);
          console.log(`Optimized: ${filePath}`);
        }
      })
    );

    console.log('SVG files optimized successfully!');
  } catch (error) {
    console.error('Error optimizing SVG files:', error);
  }
}

// Run the optimization function
optimizeSVGFiles();
