const fs = require('fs');
const path = require('path');

module.exports = config => {
  config.devServer = {
    host: 'localhost',
    // host: 'web.0351zhuangxiu.com',
    // port: 443,
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'ssl/ssl.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'ssl/ssl.crt'))
    // },
    proxy: {
      '/tour/static': {
        sw: false,
        target: 'https://web.0351zhuangxiu.com:443',
        pathRewrite: { '^/tour/static': '/static' },
        changeOrigin: false
      }
    },
    disableHostCheck: true
  };
}