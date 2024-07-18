// svgo.config.js

module.exports = {
  js2svg: { indent: 2, pretty: true },
  multipass: true, // Enable multipass for more thorough optimization
  floatPrecision: 2, // Set floating-point precision for coordinate values
  datauri: false, // Disable converting images into data URIs
  plugins: [

    { active: true, name: 'removeXMLNS' }, 
    { active: true, name: 'removeXlink' }, 


    { active: true, name: 'collapseGroups' }, 
    { active: true, name: 'convertShapeToPath' }, 
    { active: true, name: 'convertPathData' }, 
    // { active: true, name: 'reusePaths' }, 
    // { active: true, name: 'reusePaths' }, 
    { active: true, name: 'removeUselessStrokeAndFill' }, 
    { active: true, name: 'sortAttrs' }, 
    { active: true, name: 'cleanupIds' },
    { active: true, name: 'removeComments' },
    { active: true, name: 'removeDoctype' },
    { active: false, name: 'removeViewBox' },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          { class: "icon--svg" },
          // { xmlns: "http://www.w3.org/2000/svg" },
          // { "xmlns:xlink": "http://www.w3.org/1999/xlink" },
          { role: "image" },
        ]
      }
    }
  ],
};

