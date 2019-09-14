const UglifyjsPlugin = require('uglifyjs-webpack-plugin');

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
}