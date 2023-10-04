import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({
	name: 'tour_feature'
})
export class Feature extends BaseEntity {
  @PrimaryGeneratedColumn()
  	id: number

  @Column({
  	name: 'feature_title',
  	type: 'varchar',
  	length: 60
  })
  	featureTitle: string

  @Column({
  	name: 'feature_content',
  	type: 'text'
  })
  	featureContent: string

  @Column({
  	name: 'feature_ico_path',
  	type: 'varchar',
  	length: 255
  })
  	featureIcoPath: string

  @Column({
  	name: 'feature_url',
  	type: 'varchar',
  	length: 255
  })
  	featureUrl: string

  @Column({
  	name: 'feature_classify',
  	type: 'int',
  	default: 1
  })
  	featureClassify: number

  @Column({
  	name: 'feature_belong_region',
  	type: 'int',
  	default: 1
  })
  	featureBelongRegin: number
}
