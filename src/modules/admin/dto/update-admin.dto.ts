import { IsEmail } from 'class-validator';
import {
  IsOptionalString,
  IsOptionalBoolean,
} from '../../../common/validation';

export class UpdateAdminDto {
  @IsOptionalString(255)
  @IsEmail()
  public email: string;

  @IsOptionalString(255)
  public firstName: string;

  @IsOptionalString(255)
  public lastName: string;

  @IsOptionalBoolean()
  public isActive: boolean;

  @IsOptionalBoolean()
  public isSuperAdmin: boolean;
}
