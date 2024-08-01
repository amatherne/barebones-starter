// ../tina/schemas/components/block-selector.js

import { 
  PageBlocksMain,
  PageBlocksHero,
  PageBlocksCtas,
  PageBlocksContactForm,
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
    PageBlocksContactForm,
  ],
};

export default blockSelector;