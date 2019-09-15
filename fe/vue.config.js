const webpackBaseConfig = require('./build/webpack.base.config');
const webpackDevConfig = require('./build/webpack.dev.config');
const webpackProdConfig = require('./build/webpack.prod.config');

const configure = {
	development: config => webpackDevConfig(config),
	production: config => webpackProdConfig(config)
}

module.exports = {
	parallel: false,
	outputDir: 'dist',
	publicPath: process.env.NODE_ENV === 'production'
		? '/tour/'
		: '/',
	configureWebpack: config => configure[process.env.NODE_ENV](config),
	chainWebpack: webpackBaseConfig
};