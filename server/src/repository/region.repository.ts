import { Region } from '../entity'

import { TourDataSource } from '../data-source'

const regionRepository = TourDataSource.getRepository<Region>('Region')

export class RegionRepository {
	public static async find () {
		return await regionRepository.find()
	}
}
