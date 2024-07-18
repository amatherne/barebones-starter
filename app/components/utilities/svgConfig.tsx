const { optimize } = require('./svgo');

const svgContent = '<svg>...</svg>';
const config = {
  multipass: true,
  plugins: ['removeDoctype', 'removeComments'],
  floatPrecision: 2,
  datauri: false,
};

const optimizedSvg = optimize(svgContent, config);
// console.log(optimizedSvg.data); // Output optimized SVG data
