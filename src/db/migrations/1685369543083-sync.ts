import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1685369543083 implements MigrationInterface {
    name = 'Sync1685369543083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "admin"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "admin"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "admin" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "admin" DROP COLUMN "created_at"
        `);
    }

}
