/**
 * Webpack 公共配置
 * @author zhaoyiming
 * @since  2019/06/20
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const config = require('../config/index');
const resolve = dir => path.join(__dirname, '../', dir);

module.exports = {
  entry: resolve('src/main.js'),
  output: {
    filename: 'static/js/[name].js',
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' 
      ? config.build.assetsPublicPath 
      : config.dev.assetsPublicPath
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'static': resolve('static')
    },
    extensions: ['.js', '.vue', '.less', '.css']
  },
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vue-resource': 'VueResource'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].css'
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: config.build.index,
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true
      }
    })
  ],
  module: {
    rules: [{
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /.(jpg|jpeg|png|gif|svg)$/,
        use: ['url-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]'
          }
        }]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              extractCSS: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        include: [resolve('src'), resolve('static')],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ],
              plugins: [ 
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-transform-runtime'
              ]
            }
          }
        ]
      }
    ]
  }
}