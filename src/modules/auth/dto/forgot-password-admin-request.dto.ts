import { IsEmail } from 'class-validator';
import { IsRequiredString } from '../../../common/validation';

export class ForgotPasswordAdminDto {
  @IsRequiredString(255)
  @IsEmail()
  public readonly email: string;
}
