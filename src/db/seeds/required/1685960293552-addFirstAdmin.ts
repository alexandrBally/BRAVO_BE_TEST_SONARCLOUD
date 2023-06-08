import type { QueryRunner } from '../../index';
import Admin from '../../entities/Admin';
import Password from '../../../utils/Password';

const firstAdmin = {
  firstName: 'Test',
  lastName: 'Test',
  email: 'test@mail.com',
  password: Password.hash('test'),
  isActive: true,
  isSuperAdmin: true,
};
const addFirstAdmin = async (queryRunner: QueryRunner) => {
  return queryRunner.manager.save(
    queryRunner.manager.create(Admin, firstAdmin),
  );
};

export default addFirstAdmin;
