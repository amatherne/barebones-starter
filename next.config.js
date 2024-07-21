/** @type {import('next').NextConfig} */

require('./utils/logger');

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


  webpack: (config, { isServer }) => {
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

    return config;
  },

};

module.exports = nextConfig;
