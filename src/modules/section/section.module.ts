import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { SectionRepository } from '../../db/repositories/section.repository';

@Module({
  controllers: [SectionController],
  providers: [SectionService, SectionRepository],
})
export class SectionModule {}
