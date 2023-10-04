import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateUserDefaultAvatar1696406073873 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            UPDATE tour_user SET user_headpic = 'https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF';
        `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
