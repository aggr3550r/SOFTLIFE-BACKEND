const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class BlogRelatedEntities1647647122878 {
    name = 'BlogRelatedEntities1647647122878'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "content" character varying NOT NULL DEFAULT ' ', "approved" boolean NOT NULL DEFAULT false, "dt_created" TIMESTAMP NOT NULL DEFAULT now(), "dt_updated" TIMESTAMP NOT NULL DEFAULT now(), "creatorId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "seller" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "creator" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "creator" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "creator"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "creator"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "seller"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }
}
