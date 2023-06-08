import { IsOptionalString } from '../../../common/validation';

export class UpdateSectionDto {
  @IsOptionalString(255)
  public description: string;

  @IsOptionalString(255)
  public date: string;

  @IsOptionalString(255)
  public title: string;

  @IsOptionalString(255)
  public address: string;

  @IsOptionalString(255)
  public image: string;
}
