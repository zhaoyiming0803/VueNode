import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateCouponEndtime1696418964257 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            UPDATE tour_coupon SET coupon_endtime = ${Date.now() + 3600 * 1000 * 24 * 365};
        `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
