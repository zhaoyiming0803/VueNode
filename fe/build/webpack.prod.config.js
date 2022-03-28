const TerserPlugin = require("terser-webpack-plugin")
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = config => {
  config.devtool = false

  config.externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'axios': 'axios',
    'vuex': 'Vuex'
  }
  
  config.optimization.minimizer.push(new TerserPlugin())

  config.plugins.push(new CompressionPlugin({
    test: /\.(js|css|html|svg)$/,
    threshold: 10,
    deleteOriginalAssets: false
  }))
}