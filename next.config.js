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
    ];
  },
}
