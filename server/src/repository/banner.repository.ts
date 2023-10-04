import { Banner } from '../entity'

import { TourDataSource } from '../data-source'

import { FindBannerDto } from '../dto/banner.dto'

const bannerRepository = TourDataSource.getRepository<Banner>('Banner')

export class BannerRepository {
	public static async find (options: FindBannerDto) {
		return await bannerRepository.findBy(options)
	}
}
