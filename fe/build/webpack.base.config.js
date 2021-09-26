/**
 * webpack 公共配置
 * @author zhaoyiming
 * @since  2019/09/14
 */
const { merge } = require('webpack-merge')
const tsImportPluginFactory = require('ts-import-plugin')

const path = require('path')
const resolve = dir => path.resolve(__dirname, '../', dir)

module.exports = config => {
	config.resolve.alias
		.set('public', resolve('public'))
		.set('@', resolve('src'))
	config.resolve.extensions
		.add('.less')
		.add('.css')

	config.plugins
		.delete('prefetch')
		.delete('preload')

	config.plugin('inline-source')
		.use(require('html-webpack-inline-source-plugin'))
		.after('html')

	config.plugin('script-ext')
		.use(require('script-ext-html-webpack-plugin'), [{
			defaultAttribute: 'defer'
		}])
		.after('html')

	config.plugin('html')
		.tap(args => {
			args[0].inlineSource = '.(app|chunk-vendors).*.(css)'
			args[0].minify = undefined
			args[0].var = {
				NODE_ENV: process.env.NODE_ENV
			}
			return args
		})

	config.module.rule('ts').use('ts-loader').tap(options => {
		options = merge(options, {
			transpileOnly: true,
			getCustomTransformers: () => ({
				before: [tsImportPluginFactory({
					libraryName: 'vant',
					libraryDirectory: 'es',
					style: true
				})]
			}),
			compilerOptions: {
				module: 'es2015'
			}
		})
		return options
	})

	config.plugin('copy').tap(args => {
		args[0][0].from = resolve('src/static')
		args[0][0].to = 'static'
			return args
	})
}