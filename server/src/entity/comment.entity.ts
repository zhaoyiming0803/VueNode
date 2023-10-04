import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({
	name: 'tour_comment'
})
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  	id: number

  @Column({
  	name: 'comment_content',
  	type: 'text'
  })
  	commentContent: string

  @Column({
  	name: 'comment_star',
  	type: 'tinyint',
  	width: 1
  })
  	commentStar: number

  @Column({
  	name: 'comment_user_phone',
  	type: 'varchar',
  	length: 11
  })
  	commentUserPhone: string

  @Column({
  	name: 'comment_time',
  	type: 'int',
  	width: 13
  })
  	commentTime: number

  @Column({
  	name: 'comment_coupon_id'
  })
  	commentCouponId: number
}
