import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({
	name: 'tour_banner'
})
export class Banner extends BaseEntity {
  @PrimaryGeneratedColumn()
  	id: number

  @Column({
  	name: 'banner_path',
  	type: 'varchar',
  	length: 255
  })
  	bannerPath: string

  @Column({
  	name: 'banner_belong_region',
  	type: 'int',
  	nullable: true
  })
  	bannerBelongRegion: number
}
