// ../tina/schemas/components/block-selector.js

import { 
  hero, 
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
    hero, 
    // featureBlock, 
    // contentBlock
  ],
};

export default blockSelector;