const path = require('path');
const fs = require('fs-extra');

// Function to clear the output directory
const clearOutputDir = async (outputDir) => {
  console.log(`{clearOutputDir} -- outputDir: ${outputDir}`)
  try {
    if (fs.existsSync(outputDir)) {
      await fs.emptyDir(outputDir); // Remove all files and directories inside outputDir
      // console.log('Output directory cleared.');
    } else {
      console.log('{clearOutputDir} -- Output directory does not exist. Creating it.');
      await fs.ensureDir(outputDir); // Create directory if it does not exist
    }
  } catch (error) {
    console.error('{clearOutputDir} -- Error clearing output directory:', error);
  }
};

module.exports = {
  clearOutputDir,
};
