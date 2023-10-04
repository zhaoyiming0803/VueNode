import { User } from '../entity'

import { TourDataSource } from '../data-source'

import { ChangeUserNameDto, ChangeUserSexDto, FindUserByPhoneDto, GetUserInfoDto } from '../dto'

const userRepository = TourDataSource.getRepository<User>('User')

export class UserRepository {
	public static async getUserInfo (options: GetUserInfoDto) {
		return await userRepository
			.createQueryBuilder('user')
			.select(['user.userName', 'user.userPhone', 'user.userHeadPic', 'user.userSex'])
			.where('user.id = :id', { id: options.id })
			.getOne()
	}
  
	public static async changeUserName (options: ChangeUserNameDto) {
		return await userRepository.update({
			id: options.userId
		}, {
			userName: options.userName
		})
	}
  
	public static async changeUserSex (options: ChangeUserSexDto) {
		return await userRepository.update({
			id: options.userId
		}, {
			userSex: options.sex
		})
	}

	public static async findUserByPhone (options: FindUserByPhoneDto) {
		return await userRepository.findOneBy({
			userPhone: options.phone
		})
	}
}