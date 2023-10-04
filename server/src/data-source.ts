import { DataSource } from 'typeorm'

export const TourDataSource = new DataSource({
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: '123456',
	database: 'tour',
	// 只能通过 migration 手动同步数据库，不允许在这个地方同步
	synchronize: false,
	logging: false,
	entities: [__dirname + '/entity/*.entity{.ts,.js}'],
	migrations: [__dirname + '../migration/*{.ts,.js}'],
})

export function initORM () {
	return TourDataSource.initialize()
		.then(() => {
			console.log('Data Source has been initialized!')
		})
		.catch((error) => {
			console.error('Error during Data Source initialization', error)
		})
}