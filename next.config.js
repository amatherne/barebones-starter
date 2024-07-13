/** @type {import('next').NextConfig} */

require('./utils/logger');

const es6Promise = require('es6-promise');
const path = require('path');

es6Promise.polyfill();

module.exports = {
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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    
    config.resolve.modules.push(path.resolve('./'));

    return config;

  },
};

