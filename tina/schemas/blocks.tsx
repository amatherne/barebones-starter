// ../tina/schemas/blocks.tsx

import React from 'react'
import type { Page } from '../__generated__/types'

import Hero from './blocks/hero';
// import Content from './blocks/content';
// import Ctas from './blocks/ctas';

const Blocks = (props: Page) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
          if (!block || !block.__typename) return null;

          console.log(block)

          const blockType: string = block.__typename;

          console.log(blockType)
          console.log(blockType == 'PagesBlocksHero')

          switch (blockType) {
            case 'PagesBlocksHero':
              return (
                <React.Fragment key={i + blockType}>
                  <Hero data={block} />
                </React.Fragment>
              )
              break;
            default:
              return null
          }
        })
      : null}
    </>
  )
}

export { Blocks, Hero };