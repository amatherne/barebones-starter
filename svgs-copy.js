// ../copy-svgs.js

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const srcDir = path.join(__dirname, 'public/uploads'); // Update with your SVG source directory
const destDir = path.join(__dirname, 'public/svgs');

async function copySVGs() {
  try {
    // Ensure destination directory exists
    await fs.ensureDir(destDir);

    // Find all SVG files in the source directory
    const files = glob.sync(`${srcDir}/**/*.svg`);

    // Copy each SVG file to the destination directory
    await Promise.all(
      files.map(async (file) => {
        const destPath = path.join(destDir, path.basename(file));
        await fs.copy(file, destPath);
      })
    );

    console.log('SVG files copied successfully!');
  } catch (error) {
    console.error('Error copying SVG files:', error);
  }
}

copySVGs();
