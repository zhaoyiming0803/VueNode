import Router from '@koa/router'

import { ClassifyController }  from '../controller'

export const classifyRouter = new Router()

classifyRouter.get(
	'getClassifyList', 
	'/tour/classify/list',
	ClassifyController.find
)


