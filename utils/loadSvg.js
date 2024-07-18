// utils/loadSvg.js

import React from 'react';
import { SVG } from 'react-svg';

export const loadSvg = async (fileName) => {
  const file = `/public/svgs/${fileName}`;
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error('SVG not found');
    const svg = await response.text();
    return (props) => (
      <SVG src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`} {...props} />
    );
  } catch (error) {
    console.error('Error loading SVG:', error);
    console.error(`file: ${file}`)
    return null;
  }
};
