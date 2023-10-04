
import { Context } from 'koa'

import { UserRepository } from '../repository'

import { ChangeUserNameDto, ChangeUserSexDto } from '../dto'


export class UserController {
	public static async getUserInfo (ctx: Context) {
		const { id } = ctx.query

		try {
			const res = await UserRepository.getUserInfo({
				id: +id
			})
	
			let message = res ? '' : '用户不存在'
	
			ctx.body = {
				apiCode: 0,
				data: res,
				message
			}
		} catch (error) {
			ctx.body = {
				apiCode: -1,
				data: null,
				message: error.message
			}
		}
	}

	public static async changeUserName (ctx: Context) {
		const { userId, userName } = ctx.request.body as ChangeUserNameDto

		try {
			await UserRepository.changeUserName({
				userName,
				userId
			})

			ctx.body = {
				apiCode: 0,
				message: '用户名修改成功'
			}
		} catch (error) {
			ctx.body = {
				apiCode: -1,
				message: error.message
			}
		}
	}

	public static async changeUserSex (ctx: Context) {
		const { userId, sex } = ctx.request.body as ChangeUserSexDto

		try {
			await UserRepository.changeUserSex({
				sex,
				userId
			})

			ctx.body = {
				apiCode: 0,
				message: '性别修改成功'
			}
		} catch (error) {
			ctx.body = {
				apiCode: -1,
				message: error.message
			}
		}
	}
}
