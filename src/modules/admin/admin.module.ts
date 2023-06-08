import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminRepository } from '../../db/repositories/admin.repository';
import { KeyValueStorageModule } from '../key-value-storage-module/key-value-storage.module';

@Module({
  imports: [KeyValueStorageModule],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
})
export class AdminModule {}
