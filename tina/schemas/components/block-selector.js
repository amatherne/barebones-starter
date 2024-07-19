// ../tina/schemas/components/block-selector.js

import { 
  PageBlocksMain,
  PageBlocksHero,
  PageBlocksCtas,
} from '../blocks'

const blockSelector = { 
  type: 'object',
  list: true,
  name: 'blocks',
  label: 'Sections',
  ui: {
    visualSelector: true,
  },
  templates: [
    PageBlocksMain,
    PageBlocksHero,
    PageBlocksCtas,
  ],
};

export default blockSelector;