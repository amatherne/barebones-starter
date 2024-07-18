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
    
    // Disable HMR for both client and server builds
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }

    // Add SVGR and svgo-loader for SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(ts|tsx|js|jsx)$/],
      },
      use: [
        '@svgr/webpack', // Handles SVG as React components
        {
          loader: 'svgo-loader', // Optimizes SVG files
          options: svgoConfig, // Config file for svgo-loader options
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
