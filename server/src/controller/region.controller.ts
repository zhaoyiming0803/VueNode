
import { Context } from 'koa'

import { RegionRepository } from '../repository'

export class RegionController {
	public static async find (ctx: Context) {
		const res = await RegionRepository.find()

		ctx.body = {
			apiCode: 0,
			data: res,
			message: ''
		}
	}
}
