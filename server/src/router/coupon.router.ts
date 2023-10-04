import Router from '@koa/router'

import { CouponController }  from '../controller'

import { validateBody, validateQuery } from '../middleware'

import { GetCouponDetailDto, GetCouponListDto, ReceiveCouponDto, GetCouponRecordByUserDto, GetReceivedCouponListDto } from '../dto'

export const couponRouter = new Router()

couponRouter.get(
	'getCouponList', 
	'/tour/coupon/list',
	validateQuery(GetCouponListDto),
	CouponController.find
)

couponRouter.get(
	'getCouponDetail', 
	'/tour/coupon/detail',
	validateQuery(GetCouponDetailDto),
	CouponController.detail
)

couponRouter.post(
	'receiveCoupon',
	'/tour/coupon/receive',
	validateBody(ReceiveCouponDto),
	CouponController.receive
)

couponRouter.get(
	'getCouponRecordByUser',
	'/tour/coupon/record',
	validateQuery(GetCouponRecordByUserDto),
	CouponController.getCouponRecordByUser
)

couponRouter.get(
	'getReceivedCouponList',
	'/tour/coupon/received',
	validateQuery(GetReceivedCouponListDto),
	CouponController.getReceivedCouponList
)


