const path = require('path');
const resolve = dir => path.resolve(__dirname, '../', dir);

module.exports = {
  build: {
    assetsRoot: resolve('dist'),
    index: resolve('index.html'),
    assetsPublicPath: '/',
    assetsSubDirectory: 'static'
  },
  dev: {
    host: 'localhost',
    port: 3000,
    assetsPublicPath: '/',
    assetsSubDirectory: 'static'
  }
};