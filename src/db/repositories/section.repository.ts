import { Injectable, NotFoundException } from '@nestjs/common';

import Section from '../entities/Section';
import { DataSource, FindOptionsWhere } from 'typeorm';

@Injectable()
export class SectionRepository {
  private entityManager = this.connection.manager;

  constructor(private connection: DataSource) {}

  public async createOrUpdate(data: Partial<Section>): Promise<Section> {
    const entity = this.entityManager.create(Section, data) as Section;
    await this.entityManager.save(entity);
    return entity;
  }

  public async findByOrThrow(dto: FindOptionsWhere<Section>): Promise<Section> {
    const section = await this.entityManager.findOne(Section, {
      where: {
        ...dto,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    return section;
  }
}
