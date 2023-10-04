import Router from '@koa/router'

import { RegionController }  from '../controller'

export const regionRouter = new Router()

regionRouter.get(
	'getRegionList', 
	'/tour/region/list',
	RegionController.find
)


