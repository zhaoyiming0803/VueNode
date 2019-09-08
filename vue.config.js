const merge = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
  parallel: false,
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? '/fe/' : '/',
  chainWebpack: config => {
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
  }
};
