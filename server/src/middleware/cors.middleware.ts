import { Context, Next } from 'koa'

export async function cors (ctx: Context, next: Next) {
	// 正式环境不建议用 *
	ctx.set('access-control-allow-origin', '*')
	ctx.set('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Expose-Headers, Platform, Token, Uid')
	ctx.set('access-control-allow-methods', 'PUT, POST, GET, DELETE, OPTIONS, HEAD')

	await next()
}