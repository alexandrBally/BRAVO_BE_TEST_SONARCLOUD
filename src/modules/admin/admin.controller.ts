import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAdminGuard } from '../../common/guards/admin-auth.guard';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { AdminService } from './admin.service';
import { GetAdminsListRequest } from './dto/get-list-request';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { RemoveAdminDto } from './dto/remove-admin-request.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @UseGuards(JwtAuthGuard, JwtAdminGuard)
  @Get()
  findAll(@Query() dto: GetAdminsListRequest) {
    return this.adminService.findAll(dto);
  }

  @UseGuards(JwtAuthGuard, JwtAdminGuard)
  @Get(':adminId')
  findOne(@Param('adminId', new ParseIntPipe()) adminId: number) {
    return this.adminService.findOne(adminId);
  }

  @UseGuards(JwtAuthGuard, JwtAdminGuard)
  @Patch(':adminId')
  update(
    @Param('adminId', new ParseIntPipe()) adminId: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(adminId, updateAdminDto);
  }

  @UseGuards(JwtAuthGuard, JwtAdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  remove(@Body() removeAdminDto: RemoveAdminDto) {
    return this.adminService.remove(removeAdminDto.adminIds);
  }
}
