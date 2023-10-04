
import { Context } from 'koa'

import { ClassifyRepository } from '../repository'

export class ClassifyController {
	public static async find (ctx: Context) {
		const res = await ClassifyRepository.find()

		ctx.body = {
			apiCode: 0,
			data: res,
			message: ''
		}
	}
}
