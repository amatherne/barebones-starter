// ../components/blocks.js

import React from 'react';
import Hero from './blocks/hero'; // Import your block components
import CTAs from './blocks/ctas'; // Import other block components as needed

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
          
          case 'PageBlocksCtas': 
            return <CTAs key={index} settings={block} {...block} />;
          
          // Add more cases for other block types as needed
          default:
            return null;

        }
      })}
    </>
  );
};

export default Blocks;
