import { Type } from 'class-transformer';
import { IsRequiredArray } from '../../../common/validation';

export class RemoveAdminDto {
  @IsRequiredArray()
  @Type(() => Number)
  public adminIds: number[];
}
