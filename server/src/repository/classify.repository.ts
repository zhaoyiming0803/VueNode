import { Classify } from '../entity'

import { TourDataSource } from '../data-source'

const classifyRepository = TourDataSource.getRepository<Classify>('Classify')

export class ClassifyRepository {
	public static async find () {
		return await classifyRepository.find()
	}
}
