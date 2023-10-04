import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateTourIconPath1696413073247 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            UPDATE tour_coupon set coupon_ico_path = '//t7.baidu.com/it/u=1963305748,3425007544&fm=193' where id % 2 = 0;
        `)

		await queryRunner.query(`
            UPDATE tour_coupon set coupon_ico_path = '//t7.baidu.com/it/u=3596032583,931971989&fm=193' where id % 2 != 0;
        `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
