import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({
	name: 'tour_user'
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  	id: number

  @Column({
  	name: 'user_name',
  	type: 'varchar',
  	length: 60,
  	default: '锦囊团用户'
  })
  	userName: string

  @Column({
  	name: 'user_phone',
  	type: 'varchar',
  	length: 11
  })
  	userPhone: string

  @Column({
  	name: 'user_pwd',
  	type: 'varchar',
  	length: 255
  })
  	userPwd: string

  @Column({
  	name: 'user_headpic',
  	type: 'varchar',
  	length: 255,
  	default: 'http://jinnangtuan.com/static/img/users/jinnangusers/head.png'
  })
  	userHeadPic: string

  @Column({
  	name: 'user_sex',
  	type: 'tinyint',
  	width: 1,
  	default: 1
  })
  	userSex: number
}
