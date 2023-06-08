import { IsRequiredString } from '../../../common/validation';

export class ResetPasswordAdminDto {
  @IsRequiredString(255)
  public readonly password: string;

  @IsRequiredString(255)
  public readonly repeatPassword: string;

  @IsRequiredString(255)
  public readonly token: string;
}
