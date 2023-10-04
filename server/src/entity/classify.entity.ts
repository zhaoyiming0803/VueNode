import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({
	name: 'tour_classify'
})
export class Classify extends BaseEntity {
  @PrimaryGeneratedColumn()
  	id: number

  @Column({
  	name: 'classify_name',
  	type: 'varchar',
  	length: 10
  })
  	classifyName: string
}
