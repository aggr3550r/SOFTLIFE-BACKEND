const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class UpdateUserSchema1647554667280 {
    name = 'UpdateUserSchema1647554667280'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "admin" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "seller" ALTER COLUMN "admin" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "seller" ALTER COLUMN "seller" SET DEFAULT 'false'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "seller" ALTER COLUMN "seller" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "seller" ALTER COLUMN "admin" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "admin" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "description" character varying NOT NULL`);
    }
}
