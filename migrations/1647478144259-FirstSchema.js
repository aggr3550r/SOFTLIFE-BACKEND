const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class FirstSchema1647478144259 {
    name = 'FirstSchema1647478144259'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "anticipator" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (0))`);
        await queryRunner.query(`CREATE TABLE "seller" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (0), "seller" boolean NOT NULL DEFAULT (0), "city" varchar NOT NULL, "state" varchar NOT NULL, "country" varchar NOT NULL, "zip" integer NOT NULL, "created" datetime NOT NULL DEFAULT (1647478148972))`);
        await queryRunner.query(`CREATE TABLE "temporary_seller" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (0), "seller" boolean NOT NULL DEFAULT (0), "city" varchar NOT NULL, "state" varchar NOT NULL, "country" varchar NOT NULL, "zip" integer NOT NULL, "created" datetime NOT NULL DEFAULT (1647478148974))`);
        await queryRunner.query(`INSERT INTO "temporary_seller"("id", "email", "password", "admin", "seller", "city", "state", "country", "zip", "created") SELECT "id", "email", "password", "admin", "seller", "city", "state", "country", "zip", "created" FROM "seller"`);
        await queryRunner.query(`DROP TABLE "seller"`);
        await queryRunner.query(`ALTER TABLE "temporary_seller" RENAME TO "seller"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "seller" RENAME TO "temporary_seller"`);
        await queryRunner.query(`CREATE TABLE "seller" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (0), "seller" boolean NOT NULL DEFAULT (0), "city" varchar NOT NULL, "state" varchar NOT NULL, "country" varchar NOT NULL, "zip" integer NOT NULL, "created" datetime NOT NULL DEFAULT (1647478148972))`);
        await queryRunner.query(`INSERT INTO "seller"("id", "email", "password", "admin", "seller", "city", "state", "country", "zip", "created") SELECT "id", "email", "password", "admin", "seller", "city", "state", "country", "zip", "created" FROM "temporary_seller"`);
        await queryRunner.query(`DROP TABLE "temporary_seller"`);
        await queryRunner.query(`DROP TABLE "seller"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "anticipator"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }
}
