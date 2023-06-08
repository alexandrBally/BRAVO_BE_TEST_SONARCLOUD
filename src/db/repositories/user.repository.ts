import { Injectable } from '@nestjs/common';

import User from '../entities/User';
import { DataSource, FindOptionsWhere } from 'typeorm';

@Injectable()
export class UserRepository {
  private entityManager = this.connection.manager;

  constructor(private connection: DataSource) {}

  public async createOrUpdate(data: Partial<User>): Promise<User> {
    const entity = this.entityManager.create(User, data) as User;
    this.entityManager.getRepository(User);
    await this.entityManager.save(entity);
    delete entity.password;
    return entity;
  }

  public async findByEmail(email: string): Promise<User> {
    return this.entityManager
      .createQueryBuilder(User, 'users')
      .where('users.email = :email', { email })
      .getOne();
  }

  public async findBy(dto: FindOptionsWhere<User>): Promise<User> {
    return this.entityManager.findOne(User, {
      where: {
        ...dto,
      },
    });
  }
}
