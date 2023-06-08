import { Injectable } from '@nestjs/common';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminRepository } from '../../db/repositories/admin.repository';
import { GetAdminsListRequest } from './dto/get-list-request';
import { JwtService } from '@nestjs/jwt';
import { KeyValueStorageService } from '../key-value-storage-module/services/key-value-storage.service';

@Injectable()
export class AdminService {
  constructor(
    public readonly adminRepository: AdminRepository,
    public readonly jwtService: JwtService,
    public readonly keyValueStorageService: KeyValueStorageService,
  ) {}
  public async findAll(dto: GetAdminsListRequest) {
    const adminsList = await this.adminRepository.findAll(dto);
    return adminsList;
  }

  public async findOne(adminId: number) {
    const admin = await this.adminRepository.findByOrThrow({
      adminId,
    });
    return admin;
  }

  public async update(adminId: number, updateAdminDto: UpdateAdminDto) {
    const updatedAdmin = await this.adminRepository.createOrUpdate({
      adminId,
      ...updateAdminDto,
    });
    return updatedAdmin;
  }

  public async remove(adminIds: number[]) {
    const deletedAdmin = await this.adminRepository.remove(adminIds);
    return deletedAdmin;
  }
}
