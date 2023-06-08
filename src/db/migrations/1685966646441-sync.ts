import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1685966646441 implements MigrationInterface {
    name = 'Sync1685966646441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "section"
            ADD "section_sport_sport_id" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "section"
            ADD CONSTRAINT "UQ_ae7d831d427c9302be269184128" UNIQUE ("section_sport_sport_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "section"
            ADD CONSTRAINT "FK_ae7d831d427c9302be269184128" FOREIGN KEY ("section_sport_sport_id") REFERENCES "sport"("sport_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "section" DROP CONSTRAINT "FK_ae7d831d427c9302be269184128"
        `);
        await queryRunner.query(`
            ALTER TABLE "section" DROP CONSTRAINT "UQ_ae7d831d427c9302be269184128"
        `);
        await queryRunner.query(`
            ALTER TABLE "section" DROP COLUMN "section_sport_sport_id"
        `);
    }

}
