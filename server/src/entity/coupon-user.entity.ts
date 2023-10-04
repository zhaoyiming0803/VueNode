import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({
	name: 'tour_coupon_user'
})
export class CouponUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  	id: number

  @Column({
  	name: 'coupon_id',
  	type: 'int'
  })
  	couponId: number

  @Column({
  	name: 'user_id',
  	type: 'int'
  })
  	userId: number

  @Column({
  	name: 'status',
  	type: 'enum',
  	enumName: 'couponStatus',
  	comment: '当前优惠券是否已被使用'
  })
  	status: '0' | '1'
}
