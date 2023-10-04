import { User } from '../entity'

import { TourDataSource } from '../data-source'

import { LoginFormDto, RegistFormDto, ResetPasswordDto } from '../dto'

const userRepository = TourDataSource.getRepository<User>('User')

export class AuthRepository {
	public static async login (options: LoginFormDto) {
		return await userRepository.findOneBy({
			userPhone: options.phone,
			userPwd: options.pwd
		})
	}
  
	public static async regist (options: RegistFormDto) {
		return await userRepository.insert({
			userPhone: options.phone,
			userPwd: options.pwd
		})
	}
  
	public static async resetPassword (options: ResetPasswordDto) {
		return await userRepository.update({
			userPhone: options.phone
		}, {
			userPwd: options.pwd
		})
	}
}
