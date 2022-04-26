const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class ChangedDefaultAdmin1650954183817 {
    name = 'ChangedDefaultAdmin1650954183817'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "anticipator" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "anticipator" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "anticipator" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "anticipator" DROP COLUMN "admin"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "admin"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "creator"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "dt_created"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "dt_created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "admin" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "creator" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "anticipator" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "anticipator" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "anticipator" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "anticipator" ADD "admin" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "message" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "message" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b"`);
        await queryRunner.query(`ALTER TABLE "blog_post" DROP CONSTRAINT "FK_8b83add9a04e2677fc84f771a8a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "creatorId"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "creatorId" integer`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "PK_ba01f0a3e0123651915008bc578"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "anticipator" DROP CONSTRAINT "PK_63cdd597635d0f55408572e03d5"`);
        await queryRunner.query(`ALTER TABLE "anticipator" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "anticipator" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "anticipator" ADD CONSTRAINT "PK_63cdd597635d0f55408572e03d5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "admin" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "creatorId"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "creatorId" uuid`);
        await queryRunner.query(`ALTER TABLE "seller" DROP CONSTRAINT "PK_36445a9c6e794945a4a4a8d3c9d"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "seller" ADD CONSTRAINT "PK_36445a9c6e794945a4a4a8d3c9d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "anticipator" DROP CONSTRAINT "PK_63cdd597635d0f55408572e03d5"`);
        await queryRunner.query(`ALTER TABLE "anticipator" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "anticipator" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "anticipator" ADD CONSTRAINT "PK_63cdd597635d0f55408572e03d5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "seller" DROP CONSTRAINT "PK_36445a9c6e794945a4a4a8d3c9d"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "seller" ADD CONSTRAINT "PK_36445a9c6e794945a4a4a8d3c9d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "seller" ALTER COLUMN "seller" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "PK_ba01f0a3e0123651915008bc578"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_post" ADD CONSTRAINT "FK_8b83add9a04e2677fc84f771a8a" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_post" DROP CONSTRAINT "FK_8b83add9a04e2677fc84f771a8a"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "PK_ba01f0a3e0123651915008bc578"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "seller" ALTER COLUMN "seller" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "seller" DROP CONSTRAINT "PK_36445a9c6e794945a4a4a8d3c9d"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "seller" ADD CONSTRAINT "PK_36445a9c6e794945a4a4a8d3c9d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "anticipator" DROP CONSTRAINT "PK_63cdd597635d0f55408572e03d5"`);
        await queryRunner.query(`ALTER TABLE "anticipator" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "anticipator" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "anticipator" ADD CONSTRAINT "PK_63cdd597635d0f55408572e03d5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "seller" DROP CONSTRAINT "PK_36445a9c6e794945a4a4a8d3c9d"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "seller" ADD CONSTRAINT "PK_36445a9c6e794945a4a4a8d3c9d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "creatorId"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "creatorId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "admin" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "anticipator" DROP CONSTRAINT "PK_63cdd597635d0f55408572e03d5"`);
        await queryRunner.query(`ALTER TABLE "anticipator" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "anticipator" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "anticipator" ADD CONSTRAINT "PK_63cdd597635d0f55408572e03d5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "PK_ba01f0a3e0123651915008bc578"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "creatorId"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "creatorId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "blog_post" ADD CONSTRAINT "FK_8b83add9a04e2677fc84f771a8a" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "anticipator" DROP COLUMN "admin"`);
        await queryRunner.query(`ALTER TABLE "anticipator" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "anticipator" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "anticipator" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "creator"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "admin"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "dt_created"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "dt_created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "creator" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "admin" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "seller" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "anticipator" ADD "admin" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "anticipator" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "anticipator" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "anticipator" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "message" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "message" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }
}
