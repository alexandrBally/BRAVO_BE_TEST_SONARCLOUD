import { Injectable, NotFoundException } from '@nestjs/common';

import Admin from '../entities/Admin';
import { DataSource, FindOptionsWhere, In } from 'typeorm';
import { GetAdminsListRequest } from 'src/modules/admin/dto/get-list-request';
import { ADMIN_STATUS_FILTER } from 'src/common/enums';
import config from '../../config';

@Injectable()
export class AdminRepository {
  private entityManager = this.connection.manager;

  constructor(private connection: DataSource) {}

  public async createOrUpdate(data: Partial<Admin>): Promise<Admin> {
    const entity = this.entityManager.create(Admin, data) as Admin;
    await this.entityManager.save(entity);
    delete entity.password;
    return entity;
  }

  public async findByEmail(email: string): Promise<Admin> {
    return this.entityManager
      .createQueryBuilder(Admin, 'admin')
      .where('admin.email = :email', { email })
      .getOne();
  }

  public async findByOrThrow(dto: FindOptionsWhere<Admin>): Promise<Admin> {
    const admin = await this.entityManager.findOne(Admin, {
      where: {
        ...dto,
      },
    });

    if (!admin) {
      throw new NotFoundException();
    }

    return admin;
  }

  public async findAll(dto: GetAdminsListRequest): Promise<Admin[]> {
    const { take, skip } = this.getPaginationOptions({
      page: dto?.page,
      perPage: dto?.perPage,
    });

    const query = this.entityManager
      .createQueryBuilder(Admin, 'admins')
      .select()
      .orderBy('admins.createdAt', 'DESC')
      .take(take)
      .skip(skip);

    if (dto?.keyword) {
      query.andWhere(
        '(admins.email ILIKE :keyword OR admins.firstName ILIKE :keyword OR admins.lastName ILIKE :keyword)',
        { keyword: `%${dto.keyword.trim()}%` },
      );
    }
    if (dto?.status) {
      if (dto.status === ADMIN_STATUS_FILTER.admin) {
        query
          .andWhere('admins.isActive = TRUE')
          .andWhere('admins.isSuperAdmin = FALSE');
      }
      if (dto.status === ADMIN_STATUS_FILTER.superAdmin) {
        query
          .andWhere('admins.isActive = TRUE')
          .andWhere('admins.isSuperAdmin = TRUE');
      }
      if (dto.status === ADMIN_STATUS_FILTER.pending) {
        query.andWhere('admins.isActive = FALSE');
      }
    }
    return await query.getMany();
  }

  public getPaginationOptions = (pagination: {
    page?: number | string;
    perPage?: number | string;
  }): {
    take: number;
    skip: number;
  } => {
    let take = +config.query.defaultPerPageCount;
    let skip = 0;

    const page = +pagination.page || 1;

    if (pagination.perPage) {
      take = +pagination.perPage;
      skip = take * (page - 1);
    }

    return {
      take,
      skip,
    };
  };

  public async remove(adminIds: number[]): Promise<void> {
    const query = this.entityManager
      .createQueryBuilder()
      .delete()
      .from(Admin)
      .where({
        adminId: In(adminIds),
      });
    await query.execute();
    return;
  }
}
