/* eslint-disable no-await-in-loop */
import requireDirectory from 'require-directory';
import type { QueryRunner } from 'typeorm';

import connectToDb from '../utils/connectToDb';
import handleTransaction from '../utils/handleTransaction';

requireDirectory.defaults.extensions = ['ts'];

type SeedFileType = { default: (queryRunner: QueryRunner) => Promise<void> };

const seedsDir = process.argv[2] || 'required';
const folderContent = requireDirectory<unknown, SeedFileType>(
  module,
  `${__dirname}/${seedsDir}`,
) as { [key: string]: SeedFileType };

const seeds = Object.entries(folderContent);

const SEEDS_META_TABLE_NAME = 'seeds';

const runSeeds = async () => {
  let currentSeedName = '';
  try {
    const connection = await connectToDb();

    const [existingTable] = await connection.query(/* sql */ `
      SELECT table_name
      FROM information_schema.tables
      WHERE
        table_schema='public'
        AND table_name='${SEEDS_META_TABLE_NAME}'
    `);

    if (!existingTable) {
      await connection.query(/* sql */ `
        CREATE TABLE "public"."${SEEDS_META_TABLE_NAME}" (
          "name" Character Varying NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "unique_seeds_name" UNIQUE( "name" )
        )
      `);
    }

    console.log('Seeds START');

    for (let i = 0; i < seeds.length; i++) {
      const [fileName, { default: seed }] = seeds[i];

      const seedName = `${fileName} (${seedsDir})`;
      currentSeedName = seedName;

      const [usedSeed] = await connection.query(/* sql */ `
        SELECT name
        FROM ${SEEDS_META_TABLE_NAME}
        WHERE name='${seedName}'
      `);

      if (usedSeed) {
        continue;
      }

      console.log(`--- ${seed.name} START ---`);
      await handleTransaction(seed);

      await connection.query(/* sql */ `
        INSERT INTO ${SEEDS_META_TABLE_NAME}("name")
        VALUES ('${seedName}')
      `);
      console.log(`--- ${seed.name} END ---`);
    }

    console.log('Seeds END');
    process.exit(0);
  } catch (err) {
    console.error(err);
    console.error(`Seed "${currentSeedName}" failed with error:`, err.message);
    process.exit(1);
  }
};

runSeeds();
