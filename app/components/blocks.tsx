// ../components/blocks.tsx

import React from 'react';
import MainContent from './blocks/main-content-section'; 
import Hero from './blocks/hero'; 
import CTAs from './blocks/ctas'; 

interface BlockProps {
  content: any; // Adjust type as needed
  settings: any[]; // Ensure this is an array of blocks
}

function getSubstring(typename: string, keyword: string = 'Blocks'): string | null {
  if (typename.includes(keyword)) {
    return typename.substring(typename.indexOf(keyword));
  } else {
    return null;
  }
}

const Blocks: React.FC<BlockProps> = ({ settings, content }) => {

  if (!settings || !Array.isArray(settings)) return null;

  return (
    <>

      {settings.map((block, index) => {

        if (!block || (!block.published && getSubstring(block.__typename) !== 'BlocksMain')) return null;

        const blockType = getSubstring(block.__typename);

        switch (blockType) {
          
          case 'BlocksMain':
            return <MainContent key={index} settings={block} content={content} {...block} />;
          
          case 'BlocksHero':
            return <Hero key={index} settings={block} {...block} />;
          
          case 'BlocksCtas':
            return <CTAs key={index} settings={block} {...block} />;

          default:
            return null;

        }
      })}
    </>
  );
};

export default Blocks;
