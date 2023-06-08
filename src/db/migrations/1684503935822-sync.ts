import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1684503935822 implements MigrationInterface {
    name = 'Sync1684503935822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "admin" (
                "admin_id" SERIAL NOT NULL,
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "password" character varying NOT NULL,
                "email" character varying NOT NULL,
                "is_active" boolean NOT NULL DEFAULT false,
                "is_super_admin" boolean NOT NULL DEFAULT false,
                CONSTRAINT "PK_08603203f2c50664bda27b1ff89" PRIMARY KEY ("admin_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "admin"
        `);
    }

}
