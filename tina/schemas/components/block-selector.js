// ../tina/schemas/components/block-selector.js

import { 
  PageBlocksHero,
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
  ],
};

export default blockSelector;