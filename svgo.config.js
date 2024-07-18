// svgo.config.js

module.exports = {
  js2svg: { indent: 2, pretty: true },
  multipass: true, // Enable multipass for more thorough optimization
  floatPrecision: 2, // Set floating-point precision for coordinate values
  datauri: false, // Disable converting images into data URIs
  plugins: [

    // { active: true, name: '' }, 
    {
      name: "removeXlink",
      params: {
        includeLegacy: false
      }
    },
    { active: true, name: 'removeXMLNS' },
    { active: true, name: 'removeXMLProcInst' },
    // { active: true, name: 'collapseGroups' }, 
    // { active: true, name: 'convertShapeToPath' }, 
    // { active: true, name: 'convertPathData' }, 
    // { active: true, name: 'removeUselessStrokeAndFill' }, 
    // { active: true, name: 'sortAttrs' }, 
    // { active: true, name: 'cleanupIds' },
    { active: true, name: 'removeComments' },
    { active: true, name: 'removeDoctype' },
    
    { active: false, name: 'removeViewBox' },

    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          { className: "icon--svg" },
          { role: "image" },
        ]
      }
    }
  ],
};

