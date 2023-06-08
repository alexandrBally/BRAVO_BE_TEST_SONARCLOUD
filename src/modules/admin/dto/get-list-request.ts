import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { ADMIN_STATUS_FILTER } from '../../../common/enums';
import { IsOptionalString } from '../../../common/validation';

export class GetAdminsListRequest {
  @IsOptionalString()
  @IsIn(Object.values(ADMIN_STATUS_FILTER))
  @ApiProperty({
    enum: ADMIN_STATUS_FILTER,
  })
  public readonly status: ADMIN_STATUS_FILTER;

  @IsOptionalString()
  @ApiProperty()
  public readonly keyword: string;

  @IsOptionalString()
  @ApiProperty()
  public readonly page: string;

  @IsOptionalString()
  @ApiProperty()
  public readonly perPage: string;
}
