const path = require('path');
const baseWebpackConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const devConfig = require('../config/index').dev;

function resolve (dir) {
  return path.join(__dirname, '../', dir);
}

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devServer: {
    host: devConfig.host,
    port: devConfig.port,
    inline: false,
    progress: true,
    contentBase: resolve('./'),
    compress: true,
    disableHostCheck: true,
    open: true,
    openPage: '../',
    index: 'index.html',
    historyApiFallback: true,
    proxy: {
      '/api': 'http://127.0.0.1:8000'
    }
  }
});