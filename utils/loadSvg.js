// utils/loadSvg.js
import React from 'react';

const loadSvg = async (fileName) => {
  try {
    const SvgComponent = (await import(`../public/svgs/${fileName}`)).default;
    return SvgComponent;
  } catch (error) {
    console.error('Error loading SVG:', error);
    return null;
  }
};

export default loadSvg;
