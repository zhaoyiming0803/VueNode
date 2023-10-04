import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({
	name: 'tour_region'
})
export class Region extends BaseEntity {
  @PrimaryGeneratedColumn()
  	id: number

  @Column({
  	name: 'region_name',
  	type: 'varchar',
  	length: 50
  })
  	regionName: string
}
