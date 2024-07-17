// ../tina/schemas/components/block-selector.js

import { 
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
    PageBlocksHero,
    PageBlocksCtas,
  ],
};

export default blockSelector;