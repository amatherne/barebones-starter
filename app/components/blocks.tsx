// ../components/blocks.tsx

import React from 'react';
import Hero from './blocks/hero'; 
import CTAs from './blocks/ctas'; 
import MainContent from './blocks/main-content-section'; 


interface BlockProps {
  content: any; 
  settings: any[]; 
}

const Blocks: React.FC<BlockProps> = ({ settings, content }) => {
 
 // console.log(settings)

  if (!settings) return null;

  return (
    <>
      {settings.map((block, index) => {
        
        // if (!block) return null;
        if (!block || (!block.published && block.__typename !==  'PageBlocksMain')) return null;

        switch (block.__typename) {
          
          case 'PageBlocksHero': 
            return <Hero key={index} settings={block} {...block} />;
          
          case 'PageBlocksCtas': 
            return <CTAs key={index} settings={block} {...block} />;

          case 'PageBlocksMain': 
            return <MainContent key={index} settings={block} content={content} {...block} />;
          
          // Add more cases for other block types as needed
          default:
            return null;

        }
      })}
    </>
  );
};

export default Blocks;
