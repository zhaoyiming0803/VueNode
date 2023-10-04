import { Comment, Coupon, CouponUser } from '../entity'

import { TourDataSource } from '../data-source'

import { GetCouponDetailDto, GetCouponListDto, GetCouponRecordByUserDto, UpdateReceivedNumDto } from '../dto'

const couponRepository = TourDataSource.getRepository<Coupon>('Coupon')

export class CouponRepository {
	public static async list (options: GetCouponListDto) {
		const baseQuery = couponRepository
			.createQueryBuilder('coupon')
			.select([
				'coupon.id', 
				'coupon.couponName', 
				'coupon.couponExplain', 
				'coupon.couponIcoPath', 
				'coupon.couponStatus', 
				'coupon.couponReceivedNum'
			])
			.take(5)
			.skip((options.page - 1) * 5)
			.orderBy('coupon.id', 'DESC')

		if (+options.regionId === 1) {
			return await baseQuery
				.where('coupon.couponBelongRegin = :regionId', { regionId: +options.regionId })
				.getMany()
		}

		return await baseQuery
			.andWhere('coupon.couponClassify = :classifyId', { classifyId: +options.classifyId })
			.getMany()
	}

	public static async detail (options: GetCouponDetailDto) {
		return await couponRepository
			.createQueryBuilder('coupon')
			.leftJoin(Comment, 'comment', 'coupon.id = comment.commentCouponId')
			.select([
				'coupon.couponName as couponName',
				'coupon.couponExplain as couponExplain',
				'coupon.couponStartTime as couponStartTime',
				'coupon.couponEndTime as couponEndTime',
				'coupon.couponIcoPath as couponIcoPath',
				'comment.commentContent as commentContent',
				'comment.commentStar as commentStar',
				'comment.commentUserPhone as commentUserPhone'
			])
			.where('coupon.id = :id')
			.setParameters({
				id: options.id
			})
			.getRawOne()
	}

	public static async updateReceivedNum (options: UpdateReceivedNumDto) {
		const coupon = await couponRepository.findOneBy({
			id: options.couponId
		})
		if (coupon) {
			coupon.couponReceivedNum += 1
		}
		return couponRepository.save(coupon)
	}

	public static async getCouponRecordByUser (options: GetCouponRecordByUserDto) {
		const { userId } = options

		// return await couponRepository
		//   .createQueryBuilder('coupon')
		//   .select([
		//     'COUNT(coupon.couponName) as num', 
		//     'coupon.couponType'
		//   ])
		//   .groupBy('coupon.couponType')
		//   .where("id in (select coupon_id from tour_coupon_user where user_id=:userId)", { userId })
		//   .getRawMany()

		const qb = couponRepository.createQueryBuilder('coupon')

		return await qb
			.select([
				'COUNT(coupon.couponName) as num', 
				'coupon.couponType as couponType'
			])
			.where('id In ' +
        qb
        	.subQuery()
        	.select('couponUser.couponId')
        	.from(CouponUser, 'couponUser')
        	.where('couponUser.userId = :userId', { userId })
        	.getQuery()
			)
			.groupBy('coupon.couponType')
			.getRawMany()
	}
}
