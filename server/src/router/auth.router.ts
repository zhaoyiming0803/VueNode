import Router from '@koa/router'

import { AuthController }  from '../controller'

import { validateBody } from '../middleware'

import { GetPhoneCodeDto, LoginFormDto, RegistFormDto, ResetPasswordDto } from '../dto'

export const authRouter = new Router()

authRouter.post(
	'loginForm', 
	'/tour/auth/loginForm',
	validateBody(LoginFormDto),
	AuthController.loginForm
)

authRouter.post(
	'registForm', 
	'/tour/auth/registForm',
	validateBody(RegistFormDto),
	AuthController.registForm
)

authRouter.post(
	'getPhoneCode',
	'/tour/auth/getPhoneCode',
	validateBody(GetPhoneCodeDto),
	AuthController.getPhoneCode
)

authRouter.post(
	'resetPassword',
	'/tour/auth/resetPassword',
	validateBody(ResetPasswordDto),
	AuthController.resetPassword
)


