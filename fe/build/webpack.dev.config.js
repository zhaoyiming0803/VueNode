const fs = require('fs');
const path = require('path');

module.exports = config => {
  config.devServer = {
    host: 'web.0351zhuangxiu.com',
    port: 443,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'ssl/ssl.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'ssl/ssl.crt'))
    },
    proxy: {
      '/tour/static': {
        sw: false,
        target: 'http://localhost:8080',
        pathRewrite: { '^/fe/static': '/static' },
        changeOrigin: false
      }
    },
    disableHostCheck: true
  };
}