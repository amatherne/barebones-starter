// ../components/Utilities/RGB_CSS.tsx

import React from 'react';

const RGB_CSS = ({ convert }) => {
  // Function to convert hex to RGB format
  const hexToRgb = (hex) => {
    // Remove '#' if present
    hex = hex.replace('#', '');

    // Extract RGB components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `${r}, ${g}, ${b}`;
  };

  // Parse the convert prop to get variable name and hex color
  const [variableName, hexValue] = convert.split(':').map((part) => part.trim());

  if (!variableName || !hexValue) {
    return null;
  }

  // Convert hex color to RGB format
  const rgbValue = hexToRgb(hexValue);


  return `${variableName}: ${hexValue};
          ${variableName}-rgb: ${rgbValue};`;
};

export default RGB_CSS;
