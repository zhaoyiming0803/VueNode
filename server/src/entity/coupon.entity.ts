import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({
	name: 'tour_coupon'
})
export class Coupon extends BaseEntity {
  @PrimaryGeneratedColumn()
  	id: number

  @Column({
  	name: 'coupon_name',
  	type: 'varchar',
  	length: 50
  })
  	couponName: string

  @Column({
  	name: 'coupon_explain',
  	type: 'varchar',
  	length: 40
  })
  	couponExplain: string

  @Column({
  	name: 'coupon_starttime',
  	type: 'varchar',
  	length: 15
  })
  	couponStartTime: string

  @Column({
  	name: 'coupon_endtime',
  	type: 'varchar',
  	length: 15
  })
  	couponEndTime: string

  @Column({
  	name: 'coupon_received_num',
  	type: 'varchar',
  	length: 255
  })
  	couponReceivedNum: string

  @Column({
  	name: 'coupon_detail',
  	type: 'text'
  })
  	couponDetail: string

  @Column({
  	name: 'coupon_type',
  	type: 'varchar',
  	length: 20
  })
  	couponType: string

  @Column({
  	name: 'coupon_ico_path',
  	type: 'varchar',
  	length: 255
  })
  	couponIcoPath: string

  @Column({
  	name: 'coupon_status',
  	type: 'varchar',
  	length: 1,
  	default: '0'
  })
  	couponStatus: string

  @Column({
  	name: 'coupon_classify',
  	type: 'varchar',
  	length: 1,
  	default: '1'
  })
  	couponClassify: string

  @Column({
  	name: 'coupon_belong_region',
  	type: 'varchar',
  	length: 1,
  	default: '1'
  })
  	couponBelongRegin: string
}
