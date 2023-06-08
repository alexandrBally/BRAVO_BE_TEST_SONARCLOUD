import { Module } from '@nestjs/common';

import { KeyValueStorageService } from './services/key-value-storage.service';

@Module({
  exports: [KeyValueStorageService],
  providers: [KeyValueStorageService],
})
export class KeyValueStorageModule {}
