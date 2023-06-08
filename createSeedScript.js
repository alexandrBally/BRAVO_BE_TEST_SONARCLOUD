/* eslint-disable */
const fs = require('fs');
const changeCase = require('change-case');

const seedName = changeCase.camelCase(process.argv[2] || 'new seed');
const seedFullName = `${Date.now()}-${seedName}.ts`;

const BASE_PATH = `${__dirname}/src/db/seeds/required`;

fs.mkdirSync(BASE_PATH, { recursive: true });

fs.writeFileSync(`${BASE_PATH}/${seedFullName}`, `import type { QueryRunner } from '../../index';

const ${seedName} = async (queryRunner: QueryRunner) => {
  //
};

export default ${seedName};
`);
