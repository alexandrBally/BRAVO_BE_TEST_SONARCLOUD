import { IsEmail } from 'class-validator';
import { IsRequiredString } from '../../../common/validation';

export class SignUpRequest {
  @IsRequiredString(255)
  @IsEmail()
  public readonly email: string;

  @IsRequiredString(255)
  public readonly firstName: string;

  @IsRequiredString(255)
  public readonly lastName: string;

  @IsRequiredString(255)
  public readonly password: string;
}
