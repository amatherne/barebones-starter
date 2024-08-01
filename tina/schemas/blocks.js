// ../tina/schemas/blocks.js

import React from 'react';
import PageBlocksHero from './blocks/hero'; 
import PageBlocksCtas from './blocks/ctas'; 
import PageBlocksMain from './blocks/main-content-section'; 
import PageBlocksContactForm from './blocks/contact-form'; 

const Blocks = ({ blocks, ...props }) => {
  
  // console.log(blocks);

  if (!blocks || blocks.length === 0) return null;

  return (
    <div>
      {blocks.map((block, index) => {
        
        // console.log(block);
        
        if (!block || !block.__typename) return null;

        switch (block.__typename) {

          case 'PageBlocksMain':
            return 
              <PageBlocksMain
                key={index}
                index={index}
                data={block}
                fields={PageBlocksMain.fields}
                {...props} // Spread props if needed
              />
            ;
          
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

          case 'PageBlocksContactForm':
            return 
              <PageBlocksContactForm
                key={index}
                index={index}
                data={block}
                fields={PageBlocksContactForm.fields}
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
  PageBlocksMain,
  PageBlocksHero, 
  PageBlocksCtas,
  PageBlocksContactForm,
};
