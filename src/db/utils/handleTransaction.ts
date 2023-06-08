import type { QueryRunner } from 'typeorm';
import dataSource from '../typeormconfig';

const handleTransaction = async <R>(
  callback: (arg: QueryRunner) => Promise<R>,
) => {
  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    const response = await callback(queryRunner);

    await queryRunner.commitTransaction();

    return response;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
};

export default handleTransaction;
