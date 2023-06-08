import { ApiProperty } from '@nestjs/swagger';

export class AdminData {
  @ApiProperty()
  public readonly adminId: number;

  @ApiProperty()
  public readonly email: string;

  @ApiProperty()
  public readonly firstName: string;

  @ApiProperty()
  public readonly lastName: string;

  @ApiProperty()
  public readonly isActive: boolean;

  @ApiProperty()
  public readonly isSuperAdmin: boolean;
}

export class AuthAdminResponse {
  @ApiProperty()
  public readonly token: string;

  @ApiProperty()
  public readonly refreshToken: string;

  @ApiProperty()
  public readonly adminData: AdminData;
}
