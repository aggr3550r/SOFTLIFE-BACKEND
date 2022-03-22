const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class ContactTable1647964609745 {
    name = 'ContactTable1647964609745'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "message" character varying NOT NULL, "dt_created" TIMESTAMP NOT NULL DEFAULT now(), "replied" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "active"`);
        await queryRunner.query(`DROP TABLE "message"`);
    }
}
