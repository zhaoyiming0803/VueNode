import { Next, Context } from 'koa'

import { validate } from 'class-validator'

export function validateQuery (Dto: any) {
	return async function (ctx: Context, next: Next) {
		return _validate(ctx.query as Partial<typeof Dto>, Dto, ctx, next)
	}
}

export function validateParams (Dto: any) {
	return async function (ctx: Context, next: Next) {
		return _validate(ctx.params, Dto, ctx, next)
	}
}

export function validateBody (Dto: any) {
	return async function (ctx: Context, next: Next) {
		const body = ctx.request.body as Partial<typeof Dto>
		return _validate(body, Dto, ctx, next)
	}
}

async function _validate (data: NodeJS.Dict<string | string[]>, Dto: any, ctx: Context, next: Next) {
	const instance = new Dto()

	Object.keys(data).forEach(key => {
		instance[key] = data[key]
	})

	const res = await validate(instance)

	if (res.length) {
		ctx.body = {
			apiCode: -1,
			message: res.map(item => {
				const items: string[] = []
				Object.keys(item.constraints).forEach(key => {
					items.push(item.constraints[key])
				})
				return items.join(',')
			}).join('. ')
		}
		return
	}

	await next()
}
