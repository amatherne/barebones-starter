// ../tina/schemas/blocks.js

import React from 'react';
import PageBlocksHero from './blocks/hero'; 
import PageBlocksCtas from './blocks/ctas'; 

const Blocks = ({ blocks, ...props }) => {
  
  // console.log(blocks);

  if (!blocks || blocks.length === 0) return null;

  return (
    <div>
      {blocks.map((block, index) => {
        
        // console.log(block);
        
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

          case 'PageBlocksCtas':
            return 
              <PageBlocksCtas
                key={index}
                index={index}
                data={block}
                fields={PageBlocksCtas.fields}
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

export { 
  Blocks, 
  PageBlocksHero, 
  PageBlocksCtas 
};
