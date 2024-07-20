

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

// Function to check for closely named files
const checkForSimilarFileNames = (files) => {
  const normalizedMap = new Map();

  files.forEach((file) => {
    const fileName = path.basename(file, path.extname(file));
    const componentName = convertFileNameToCamelCase(fileName);
    const normalized = componentName.toLowerCase();

    if (normalizedMap.has(normalized)) {
      console.error(`\n\nError: Found closely named files: \n1: ${normalizedMap.get(normalized)} \n2: ${file}\n\n`);
      process.exit(1);
    } else {
      normalizedMap.set(normalized, file);
    }
  });
};

module.exports = {
  wrapCharactersInSpan,
  convertFileNameToCamelCase,
  checkForSimilarFileNames,
};
