import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1685952851700 implements MigrationInterface {
    name = 'Sync1685952851700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "sport" (
                "sport_id" SERIAL NOT NULL,
                "name" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_85896d8d20cf619732a5c1fd727" PRIMARY KEY ("sport_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "section" (
                "section_id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                "event_date" TIMESTAMP NOT NULL,
                "address" character varying NOT NULL,
                "image" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_64bb5bb8f6931759fee65510d8e" PRIMARY KEY ("section_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "section"
        `);
        await queryRunner.query(`
            DROP TABLE "sport"
        `);
    }

}
