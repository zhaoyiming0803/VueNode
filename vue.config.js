const merge = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  parallel: false,
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? '/tour/' : '/',
  chainWebpack: config => {
    // config
    //   .plugin('copy')
    //   .tap(args => {
    //     args[0][0].from = './src/static/uploads';
    //     args[0][0].to = 'static/uploads'
    //     return args;
    //   });

    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        });
        return options;
      });
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/fe/static': {
        sw: false,
        target: 'http://localhost:8080',
        pathRewrite: {'^/fe/static' : '/static'},
        changeOrigin: false
      }
    },
    disableHostCheck: true
  }
};
