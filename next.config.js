/** @type {import('next').NextConfig} */

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
      {
        source: '/admin/app/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  },
};

