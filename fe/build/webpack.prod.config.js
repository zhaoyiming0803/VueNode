const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = config => {
  config.devtool = false;

  config.externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'axios': 'axios',
    'vuex': 'Vuex'
  };
  
  config.optimization.minimizer.push(
    new UglifyjsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false,
      uglifyOptions: {
        compress: {
          drop_console: true
        }
      }
    })
  );

  config.plugins.push(new CompressionPlugin({
    test: /\.(js|css|html|svg)$/,
    threshold: 10,
    deleteOriginalAssets: false
  }));
}