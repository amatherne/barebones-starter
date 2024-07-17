// ../tina/schemas/components/block-selector.js

import { 
  Hero, 
  // content, 
  // ctas 
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
    Hero, 
    // featureBlock, 
    // contentBlock
  ],
};

export default blockSelector;