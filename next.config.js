/** @type {import('next').NextConfig} */

const es6Promise = require('es6-promise');

es6Promise.polyfill();

const path = require('path');

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

  // Add SCSS configuration
  webpack(config, options) {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              includePaths: [path.join(__dirname, 'styles')],
            },
          },
        },
      ],
    });

    return config;
  },
};
