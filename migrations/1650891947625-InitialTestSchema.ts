import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialTestSchema1650891947625 implements MigrationInterface {
    name = 'InitialTestSchema1650891947625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, "admin" boolean NOT NULL DEFAULT false, "seller" boolean NOT NULL DEFAULT false, "creator" boolean NOT NULL DEFAULT false, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "content" character varying NOT NULL DEFAULT ' ', "approved" boolean NOT NULL DEFAULT false, "dt_created" TIMESTAMP NOT NULL DEFAULT now(), "dt_updated" TIMESTAMP NOT NULL DEFAULT now(), "creatorId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "message" character varying NOT NULL, "dt_created" TIMESTAMP NOT NULL DEFAULT now(), "replied" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "content" character varying NOT NULL DEFAULT ' ', "approved" boolean NOT NULL DEFAULT false, "dt_created" TIMESTAMP NOT NULL DEFAULT now(), "dt_updated" TIMESTAMP NOT NULL DEFAULT now(), "creatorId" integer, CONSTRAINT "PK_694e842ad1c2b33f5939de6fede" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "anticipator" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_63cdd597635d0f55408572e03d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "seller" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, "admin" boolean NOT NULL DEFAULT false, "seller" boolean NOT NULL DEFAULT false, "creator" boolean NOT NULL DEFAULT false, "active" boolean NOT NULL DEFAULT true, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "zip" integer NOT NULL, CONSTRAINT "PK_36445a9c6e794945a4a4a8d3c9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_post" ADD CONSTRAINT "FK_8b83add9a04e2677fc84f771a8a" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_post" DROP CONSTRAINT "FK_8b83add9a04e2677fc84f771a8a"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b"`);
        await queryRunner.query(`DROP TABLE "seller"`);
        await queryRunner.query(`DROP TABLE "anticipator"`);
        await queryRunner.query(`DROP TABLE "blog_post"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
