import { Injectable } from '@nestjs/common';
import { UpdateSectionDto } from './dto/update-section.dto';
import { SectionRepository } from '../../db/repositories/section.repository';

@Injectable()
export class SectionService {
  constructor(public readonly sectionRepository: SectionRepository) {}

  public async findOne(sectionId: number) {
    const section = await this.sectionRepository.findByOrThrow({
      sectionId,
    });
    return section;
  }

  public async update(sectionId: number, updateSectionDto: UpdateSectionDto) {
    const section = await this.findOne(sectionId);
    await this.sectionRepository.createOrUpdate({
      sectionId,
      ...updateSectionDto,
    });

    return {
      ...section,
      ...updateSectionDto,
    };
  }
}
