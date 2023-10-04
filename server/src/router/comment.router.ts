import Router from '@koa/router'

import { CommentController }  from '../controller'

import { validateBody, validateQuery } from '../middleware'

import { GetCommentListDto, PublishCommentDto } from '../dto/comment.dto'

export const commentRouter = new Router()

commentRouter.get(
	'getCommentList', 
	'/tour/comment/get',
	validateQuery(GetCommentListDto),
	CommentController.find
)

commentRouter.post(
	'publishComment',
	'/tour/comment/publish',
	validateBody(PublishCommentDto),
	CommentController.publish
)


