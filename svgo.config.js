// svgo.config.js

module.exports = {
  js2svg: { indent: 2, pretty: true },
  multipass: true, // Enable multipass for more thorough optimization
  floatPrecision: 2, // Set floating-point precision for coordinate values
  datauri: false, // Disable converting images into data URIs
  plugins: [
    {
      name: 'cleanupAttrs',
      active: true
    },
    {
      name: 'removeViewBox',
      active: false
    },
    {
      name: 'cleanupIds',
      active: true
    },
    {
      name: 'removeDoctype',
      active: false
    },
    {
      name: 'removeComments',
      active: true
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          { xmlns: "http://www.w3.org/2000/svg" },
          { "xmlns:xlink": "http://www.w3.org/1999/xlink" },
          { class: "icon--svg" },
          { role: "image" },
        ]
      }
    }
  ],
};

