import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1684499182091 implements MigrationInterface {
    name = 'Sync1684499182091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "user_id" SERIAL NOT NULL,
                "first_name" character varying,
                "last_name" character varying,
                "password" character varying NOT NULL,
                "email" character varying NOT NULL,
                "is_active" boolean NOT NULL DEFAULT false,
                "date_of_birth" date,
                "gender" character varying,
                "phone" character varying NOT NULL,
                CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
