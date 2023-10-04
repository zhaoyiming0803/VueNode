import { Coupon, CouponUser } from '../entity'

import { TourDataSource } from '../data-source'

import { AddCouponUserDto, FindCouponUserByIdDto, GetReceivedCouponListDto } from '../dto'

const couponUserRepository = TourDataSource.getRepository<CouponUser>('CouponUser')

export class CouponUserRepository {
	public static async findById (options: FindCouponUserByIdDto) {
		const { userId, couponId } = options
		return await couponUserRepository
			.createQueryBuilder('couponUser')
			.select([
				'couponUser.couponId',
				'couponUser.userId',
				'couponUser.status'
			])
			.where('couponUser.couponId = :couponId')
			.andWhere('couponUser.userId = :userId')
			.setParameters({
				couponId,
				userId,
			})
			.getOne()
	}

	public static async add (options: AddCouponUserDto) {
		const { userId, couponId } = options
		return await couponUserRepository
			.insert({
				userId,
				couponId
			})
	}

	public static async getReceivedCouponList (options: GetReceivedCouponListDto) {
		const { userId, type } = options

		const qb = couponUserRepository.createQueryBuilder('couponUser')

		const list = await qb
			.select('couponUser.couponId')
			.where('couponUser.userId = :userId', { userId })
			.getMany()

		const ids = list.map(item => item.couponId)

		// 其实可以不用查 couponType，在前端分类也行
		return await qb
			.leftJoin(Coupon, 'coupon', 'coupon.id = couponUser.couponId')
			.select([
				'coupon.id as id',
				'coupon.couponName as couponName',
				'coupon.couponExplain as couponExplain',
				'coupon.couponIcoPath as couponIconPath',
				'coupon.couponReceivedNum as couponReceivedNum',
				'couponUser.status'
			])
			.where(`coupon.couponStatus = "0" 
        and coupon.couponType = :type
        and coupon.id In (:...ids) 
        and couponUser.userId = :userId`, 
			{
				ids, 
				userId,
				type
			}
			)
			.getRawMany()
	}
}
