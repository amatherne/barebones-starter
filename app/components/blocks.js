// ../components/blocks.js

import React from 'react';
import Hero from './blocks/hero'; // Import your block components
// import FeatureBlock from './blocks/FeatureBlock'; // Import other block components as needed

const Blocks = ({ settings }) => {
  // console.log(settings)

  if (!settings) return null;

  return (
    <>
      {settings.map((block, index) => {
        
        if (!block) return null;

        // console.log(block.__typename)
        
        switch (block.__typename) {
          case 'PageBlocksHero': 
            return <Hero key={index} settings={block} {...block} />;
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
