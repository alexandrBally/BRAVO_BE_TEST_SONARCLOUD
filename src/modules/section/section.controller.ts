import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { UpdateSectionDto } from './dto/update-section.dto';
import { JwtAdminGuard } from '../../common/guards/admin-auth.guard';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get(':sectionId')
  findOne(@Param('sectionId', new ParseIntPipe()) sectionId: number) {
    return this.sectionService.findOne(sectionId);
  }

  @Patch(':sectionId')
  @UseGuards(JwtAuthGuard, JwtAdminGuard)
  update(
    @Param('sectionId', new ParseIntPipe()) sectionId: number,
    @Body() updateSectionDto: UpdateSectionDto,
  ) {
    return this.sectionService.update(sectionId, updateSectionDto);
  }
}
