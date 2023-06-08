import { IsEmail } from 'class-validator';

import { IsRequiredString } from '../../../common/validation';

export class SignInRequest {
  @IsRequiredString(255)
  @IsEmail()
  public readonly email: string;

  @IsRequiredString(255)
  public readonly password: string;
}
