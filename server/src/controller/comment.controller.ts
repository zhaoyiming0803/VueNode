
import { Context } from 'koa'

import { CommentRepository, CouponUserRepository, UserRepository } from '../repository'

import { GetCommentListDto, PublishCommentDto } from '../dto/comment.dto'

export class CommentController {
	public static async find (ctx: Context) {
		const { couponId } = ctx.query as Partial<GetCommentListDto>

		try {
			const res = await CommentRepository.find({
				couponId
			})
	
			ctx.body = {
				apiCode: 0,
				data: res,
				message: ''
			}
		} catch (error) {
			ctx.body = {
				apiCode: -1,
				data: null,
				message: error.message
			}
		}
	}

	public static async publish (ctx: Context) {
		const { userId, couponId, commentStar, commentContent } = ctx.request.body as PublishCommentDto

		// 按照一般的逻辑：用户购买或使用产品之后才能进行评论；
		// 这里的优惠券暂时没有判断什么时候就算使用了，所以测试执行以下逻辑：
		// 用户发表评论这个【动作】即是【使用】优惠券，优惠券使用完之后不能再次使用
		// 线上的项目，这块儿的逻辑可以修改下
		try {
			const couponUserItem = await CouponUserRepository.findById({
				couponId,
				userId
			})

			if (!couponUserItem) {
				ctx.body = {
					apiCode: 0,
					data: null,
					message: '购买优惠券之后才能评论哦'
				}
				return
			}

			if (couponUserItem.status && couponUserItem.status !== '0') {
				ctx.body = {
					apiCode: 0,
					data: null,
					message: '已经发布过评论了'
				}
				return
			}

			const user = await UserRepository.getUserInfo({
				id: userId
			})

			await CommentRepository.publish({
				commentUserPhone: user.userPhone,
				commentStar,
				commentContent,
				couponId
			})

			ctx.body = {
				apiCode: 0,
				data: null,
				message: '评论成功'
			}
		} catch (error) {
			ctx.body = {
				apiCode: -1,
				data: null,
				message: error.message
			}
		}
	}
}
