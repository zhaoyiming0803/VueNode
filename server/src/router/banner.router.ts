import Router from '@koa/router'

import { BannerController }  from '../controller'
import { validateQuery } from '../middleware'
import { FindBannerDto } from '../dto/banner.dto'

export const bannerRouter = new Router()

bannerRouter.get(
	'getRegionList', 
	'/tour/banner/get',
	validateQuery(FindBannerDto),
	BannerController.find
)


