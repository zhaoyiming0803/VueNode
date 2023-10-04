
import { Context } from 'koa'

import { BannerRepository } from '../repository'

import { FindBannerDto } from '../dto/banner.dto'

export class BannerController {
	public static async find (ctx: Context) {
		const { bannerBelongRegion } = ctx.query as Partial<FindBannerDto>
		
		const res = await BannerRepository.find({
			bannerBelongRegion
		})

		ctx.body = {
			apiCode: 0,
			data: res,
			message: ''
		}
	}
}
