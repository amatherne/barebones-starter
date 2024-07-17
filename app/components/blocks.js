// ../components/blocks.js

import React from 'react';
import Gallery from './blocks/gallery'; // Import your block components
// import FeatureBlock from './blocks/FeatureBlock'; // Import other block components as needed

const Blocks = ({ settings }) => {
  // console.log(settings)
  if (!settings) {
    return null; // Handle case where no blocks are provided
  }

  return (
    <>
      {settings.map((block, index) => {
        // console.log(block.__typename)
        switch (block.__typename) {
          case 'PageBlocksHero': // Example block type 'hero'
            return <Gallery key={index} settings={block} {...block} />;
          // case 'feature': // Example block type 'feature'
            // return <FeatureBlock key={index} {...block} />;
          // Add more cases for other block types as needed
          default:
            return null;
        }
      })}
    </>
  );
};

export default Blocks;
