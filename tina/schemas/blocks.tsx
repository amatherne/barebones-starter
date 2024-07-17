// ../schemas/blocks.tsx

import React from 'react'
import type { Pages } from '../tina/__generated__/types'

import Hero from './blocks/hero';
// import Content from './blocks/content';
// import Ctas from './blocks/ctas';

export const hero = Hero;
// export const content = Content;
// export const ctas = Ctas;

export const Blocks = (props: Pages) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
            console.log(block.__typename)
            switch (block.__typename) {
              case 'PagesBlocksContent':
                {/*return (
                  <React.Fragment key={i + block.__typename}>
                    <Content data={block} />
                  </React.Fragment>
                )*/}
              case 'PagesBlocksHero':
                return (
                  <React.Fragment key={i + block.__typename}>
                    <hero data={block} />
                  </React.Fragment>
                )
              case 'PagesBlocksFeatures':
                {/*return (
                  <React.Fragment key={i + block.__typename}>
                    <Features data={block} />
                  </React.Fragment>
                )*/}
              default:
                return null
            }
          })
        : null}
    </>
  )
}