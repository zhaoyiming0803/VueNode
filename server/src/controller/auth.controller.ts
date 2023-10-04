
import { Context } from 'koa'

import { createHash } from 'crypto'

import { GetPhoneCodeDto, LoginFormDto, RegistFormDto, ResetPasswordDto } from '../dto'

import { AuthRepository, UserRepository } from '../repository'

const md5 = createHash('md5')

export class AuthController {
	public static async loginForm (ctx: Context) {
		const { phone, pwd } = ctx.request.body as LoginFormDto
		const _pwd = md5.update(pwd).digest('hex')
		const res = await AuthRepository.login({
			phone,
			pwd: _pwd
		})
		
		if (res) {
			ctx.body = {
				apiCode: 0,
				message: '登录成功',
				data: res.id
			}
		} else {
			ctx.body = {
				apiCode: -1,
				message: '登录失败，请检查手机号或密码是否正确'
			}
		}
	}

	public static async registForm (ctx: Context) {
		const { phone, pwd } = ctx.request.body as RegistFormDto
		const _pwd = md5.update(pwd).digest('hex')

		const user = await UserRepository.findUserByPhone({
			phone
		})

		if (user) {
			ctx.body = {
				apiCode: 0,
				message: '该手机号已被注册，请直接登录'
			}
			return
		}

		try {
			await AuthRepository.regist({
				phone,
				pwd: _pwd
			})
	
			ctx.body = {
				apiCode: 0,
				message: '注册成功，请用手机号密码登录'
			}
		} catch (error) {
			ctx.body = {
				apiCode: 0,
				message: error.message
			}
		}
	}

	public static async getPhoneCode (ctx: Context) {
		const { phone } = ctx.request.body as GetPhoneCodeDto

		const user = await UserRepository.findUserByPhone({
			phone
		})

		if (!user) {
			ctx.body = {
				apiCode: 0,
				message: '该手机号尚未注册'
			}
			return
		}

		let code = ''
		for (let i = 0; i < 6; i += 1) {
			code += Math.floor(Math.random() * 10)
		}

		ctx.body = {
			apiCode: 0,
			message: '手机验证码已发送',
			data: code
		}
	}

	/**
	 * 简易处理，实际应该同时传入新旧密码
	 * @param ctx 
	 */
	public static async resetPassword (ctx: Context) {
		const { phone, pwd, phoneCode } = ctx.request.body as ResetPasswordDto
		const _pwd = md5.update(pwd).digest('hex')

		try {
			// 需要校验 phoneCode
			// ......
			await AuthRepository.resetPassword({
				phone,
				pwd: _pwd,
				phoneCode
			})
			ctx.body = {
				apiCode: 0,
				message: '密码重置成功'
			}
		} catch (error) {
			ctx.body = {
				apiCode: -1,
				message: error.message
			}
		}
	}
}
