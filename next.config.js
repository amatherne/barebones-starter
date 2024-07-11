/** @type {import('next').NextConfig} */

require('es6-promise').polyfill();

module.exports = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
      {
        source: '/admin/app/api/:path*', // Adjust this path as per your project setup
        destination: 'http://localhost:3000/api/:path*', // Ensure the correct port and path to your API
      },
    ];
  },
};
