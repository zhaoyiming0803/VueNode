import Router from '@koa/router'

import { validateBody, validateQuery } from '../middleware'

import { UserController } from '../controller/user.controller'

import { ChangeUserNameDto, ChangeUserSexDto, GetUserInfoDto } from '../dto'

export const userRouter = new Router()

userRouter.get(
	'getUserInfo',
	'/tour/user/info',
	validateQuery(GetUserInfoDto),
	UserController.getUserInfo
)

userRouter.post(
	'changeUserName',
	'/tour/user/changeUserName',
	validateBody(ChangeUserNameDto),
	UserController.changeUserName
)

userRouter.post(
	'changeUserSex',
	'/tour/user/changeUserSex',
	validateBody(ChangeUserSexDto),
	UserController.changeUserSex
)
