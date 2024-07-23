

const React = require('react');
const path = require('path');

// Function to wrap characters in span elements
function wrapCharactersInSpan(text) {
  // Split the text into an array of characters
  const characters = text.split('');

  // Map each character to a span element
  const wrappedText = characters.map((char, index) => (
    React.createElement('span', { key: index }, char)
  ));

  return wrappedText;
}

// Function to convert a string to camel case
const convertFileNameToCamelCase = (str) => {
  let string = str;
  if (string.includes('.')) {
    string = string.split('.').slice(0, -1).join('.');  // remove .ext
  }
  return string
    .replace('--', '-')                 // Remove special characters
    .replace('_', '-')                  // Remove special characters
    .replace(/[^\w\s-]/g, '')           // Remove special characters
    .replace(/\s+/g, '-')               // Replace spaces with hyphens
    .replace(/-+/g, '-')                // Replace multiple hyphens with a single hyphen
    .toLowerCase()                      // Convert to lowercase
    .split('-')                         // Split by hyphens
    .map((word, index) =>               // Capitalize first letter of each word except the first one
      index === 0
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');               // Join words to form camel case
};

// Function to check for closely named files
const checkForSimilarFileNames = (files, fileNameWithoutExt) => {
  const normalizedMap = new Map();

  for (const file of files) {
    const fileName = path.basename(file, path.extname(file));
    const componentName = convertFileNameToCamelCase(fileName);
    const normalized = componentName.toLowerCase();

    if (normalized === fileNameWithoutExt.toLowerCase()) {
      console.log(`Skipping ${fileNameWithoutExt} as a similar file already exists.`);
      return true; // Return true if a similar file is found
    }
    normalizedMap.set(normalized, file);
  }
  return false; // No similar file found
};


const cleanBlockName = (typename, string) => {
  const keyword = string || 'Blocks';
  if (typename.includes(keyword)) {
    return typename.substring(typename.indexOf(keyword));
  } else {
    return null;
  }
};


const customCSS = (css,className) => {
  try {
    if (typeof className !== 'string' || typeof css !== 'string') {
      throw new Error('Invalid input types. Both className and CSS should be strings.');
    }
    const modifiedCSS = 
      css
        .replaceAll('==', '.' + className)
        .replaceAll(';;', '##')
        .replaceAll(';', '!important;')
        .replaceAll('##', ';');
    return modifiedCSS;
  } catch (error) {
    console.error('Error in customCSS function:', error);
    return ''; // Return an empty string or handle the error as needed
  }
};



module.exports = {
  wrapCharactersInSpan,
  convertFileNameToCamelCase,
  checkForSimilarFileNames,
  cleanBlockName,
  customCSS,
};
