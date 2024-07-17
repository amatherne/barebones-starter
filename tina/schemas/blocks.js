// ../tina/schemas/blocks.js

import React from 'react';
import PageBlocksHero from './blocks/hero'; // Adjust import path as per your structure

const Blocks = ({ blocks, ...props }) => {


  if (!blocks || blocks.length === 0) return null;

  return (
    <div>
      {blocks.map((block, index) => {
        
        console.log(block);
        
        if (!block || !block.__typename) return null;

        // const blockType = block.__typename;

        switch (block.__typename) {
          case 'PageBlocksHero':
            return 
              <PageBlocksHero
                key={index}
                index={index}
                data={block}
                fields={PageBlocksHero.fields}
                {...props} // Spread props if needed
              />
            ;
          // Add other cases for different block types (if any)

          default:
            return null;
        }
      })}
    </div>
  );
};

export { Blocks, PageBlocksHero };
