import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateCouponRecivedNumInCouponTable1696423773558 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE tour_coupon CHANGE coupon_recived_num coupon_received_num int NOT NULL DEFAULT 0;
        `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
