// ../components/blocks.tsx

import React from 'react';
import MainContent from './blocks/main-content-section'; 
import Hero from './blocks/hero'; 
import CTAs from './blocks/ctas'; 
import ContactForm from './blocks/contact-form'; 

interface BlockProps {
  content: any; // Adjust type as needed
  settings: any[]; // Ensure this is an array of blocks
}

function getSubstring(typename: string, keyword: string = 'Blocks'): string | null {
  const index = typename.indexOf(keyword);
  if (index !== -1) {
    return typename.substring(index + keyword.length);
  } else {
    return null;
  }
}

const Blocks: React.FC<BlockProps> = ({ settings, content }) => {

  if (!settings || !Array.isArray(settings)) return null;

  return (
    <>

      {settings.map((block, index) => {

        if ( !block || (!block.published && (getSubstring(block.__typename) !== 'Main' && getSubstring(block.__typename) !== 'ContactForm'))) return null;

        const blockType = getSubstring(block.__typename);

        switch (blockType) {
          
          case 'Main':
            return <MainContent key={index} settings={block} index={index} content={content} {...block} />;
          
          case 'Hero':
            return <Hero key={index} settings={block} index={index} {...block} />;
          
          case 'Ctas':
            return <CTAs key={index} settings={block} index={index} {...block} />;

          case 'ContactForm':
            return <ContactForm key={index} settings={block} index={index} {...block} />;

          default:
            return null;

        }
      })}
    </>
  );
};

export default Blocks;
