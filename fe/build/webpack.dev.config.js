module.exports = config => {
  config.devServer = {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/tour/static': {
        sw: false,
        target: 'http://localhost:8080',
        pathRewrite: {'^/fe/static' : '/static'},
        changeOrigin: false
      }
    },
    disableHostCheck: true
  };
}