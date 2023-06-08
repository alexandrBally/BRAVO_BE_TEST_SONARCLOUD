import {
  HttpStatus,
  UseGuards,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { JwtAdminGuard } from 'src/common/guards/admin-auth.guard';

import { ApiSwaggerData } from '../../common/decorators/api-swagger.decorator';
import { BaseController } from '../../common/decorators/base-controller.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { mediaFileMulterConfig } from '../../common/multer/media-file-multer.config';

@BaseController('common', 'Common module')
export class CommonController {
  @Post('/upload')
  @UseGuards(JwtAuthGuard, JwtAdminGuard)
  @ApiSwaggerData({
    summary: 'Upload media',
    status: HttpStatus.OK,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', mediaFileMulterConfig))
  async uploadFile(@UploadedFile() file): Promise<string> {
    return file.location;
  }
}
