// svgo.config.js
module.exports = {
  multipass: true, // Enable multipass for more thorough optimization
  floatPrecision: 2, // Set floating-point precision for coordinate values
  datauri: false, // Disable converting images into data URIs
  plugins: [
    { removeViewBox: false }, // Example of a plugin configuration
    { cleanupIDs: false },
    // { removeDoctype: true }, // Additional plugin configuration
    // { removeComments: true },
    // { addAttributesToSVGElement: {
    //     attributes: [
    //       { xmlns: "http://www.w3.org/2000/svg" },
    //       { "xmlns:xlink": "http://www.w3.org/1999/xlink" },
    //       { class: "icon" }
    //     ]
    //   }
    // }
  ],
};
