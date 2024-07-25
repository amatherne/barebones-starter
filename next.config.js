/** @type {import('next').NextConfig} */

require('./utils/logger');

const path = require('path');
const es6Promise = require('es6-promise');
const svgoConfig = require('./svgo.config');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


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

    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';

      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // Remove console logs
            },
            output: {
              comments: false, // Remove comments
            },
          },
          extractComments: false, // Disable extracting comments to separate files
        })
      );
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
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

    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'static/fonts', 
            publicPath: '/_next/static/fonts', 
            name: '[name].[ext]',
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    });

    if (process.env.ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: isServer ? './bundles/server.html' : './bundles/client.html',
        openAnalyzer: true,
        analyzerPort: 8889, 
      }));
    }

    config.optimization.minimizer.push(
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ['default', {
            discardComments: { removeAll: true }, // Remove all comments
          }],
        },
      })
    );

    config.cache = {
      type: 'filesystem', // Use filesystem cache
      buildDependencies: {
        config: [__filename], // Rebuild when this file changes
      },
    };

    // config.optimization.usedExports = true;

    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
      },
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
    };

    return config;
  },
};

module.exports = nextConfig;
