/** @type {import('next').NextConfig} */

require('./utils/logger');

const path = require('path');
const es6Promise = require('es6-promise');
const svgoConfig = require('./svgo.config');

// Polyfill ES6 Promise for older browsers
es6Promise.polyfill();

const nextConfig = {

  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ];
  },


  webpack: (config, { isServer, defaultLoaders }) => {
  //   // Disable HMR for both client and server builds
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    // Add SVGR for SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: {
              plugins: [
                { removeViewBox: false },
                { removeDimensions: true },
              ],
              floatPrecision: 2,
            },
          },
        },
      ],
    });

    // Add SCSS handling
    // config.module.rules.push({
    //   test: /\.scss$/,
    //   use: [
    //     'style-loader', // Creates `style` nodes from JS strings
    //     'css-loader',   // Translates CSS into CommonJS
    //     'sass-loader',  // Compiles Sass to CSS
    //   ],
    // });

    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'static/fonts', // or any directory you prefer
            publicPath: '/_next/static/fonts', // path in URL
            name: '[name].[ext]',
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
