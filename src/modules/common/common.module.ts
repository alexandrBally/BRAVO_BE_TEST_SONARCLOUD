import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';

@Module({
  exports: [],
  providers: [],
  controllers: [CommonController],
})
export class CommonModule {}
