import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SignUpRequest } from './dto/sign-up.request';
import { SignInRequest } from './dto/sign-in.request';
import { AuthAdminResponse } from './dto/auth-admin.response';
import { AdminRepository } from '../../db/repositories/admin.repository';
import { Admin } from '../../db';
import Password from '../../utils/Password';
import { JwtService } from '@nestjs/jwt';
import { KeyValueStorageService } from '../key-value-storage-module/services/key-value-storage.service';
import { KEY_VALUE_STORAGE_KEYS_ENUM } from '../../common/enums';
import getEmailTransport from '../../common/emailTransport/emailTransport';
import config from '../../config';
import { ResetPasswordAdminDto } from './dto/reset-password-admin-request.dto';
import { ForgotPasswordAdminDto } from './dto/forgot-password-admin-request.dto';

@Injectable()
export class AuthService {
  constructor(
    public readonly adminRepository: AdminRepository,
    public readonly jwtService: JwtService,
    public readonly keyValueStorageService: KeyValueStorageService,
  ) {}
  public async signUp(dto: SignUpRequest): Promise<Admin> {
    const { email, password } = dto;

    const existingAdmin = await this.adminRepository.findByEmail(email);

    if (existingAdmin) {
      throw new BadRequestException('Admin already exist');
    }

    const hashedPassword = Password.hash(password);
    const newUserEntity = {
      ...dto,
      password: hashedPassword,
    };

    const newAdmin = await this.adminRepository.createOrUpdate(newUserEntity);

    const emailTransporter = getEmailTransport();
    await emailTransporter.sendMail({
      subject: 'Test',
      text: 'Test',
      to: email,
      html: '<b>Test</b>',
    });
    return newAdmin;
  }

  public async signIn(dto: SignInRequest): Promise<any> {
    const { email, password } = dto;
    const admin = await this.adminRepository.findByOrThrow({
      email,
      password: Password.hash(password),
    });

    const adminRefreshToken = await this.keyValueStorageService.get(
      `${KEY_VALUE_STORAGE_KEYS_ENUM.adminRefreshTokenKey}${admin.adminId}`,
    );

    await this.keyValueStorageService.delete(
      `${KEY_VALUE_STORAGE_KEYS_ENUM.adminRefreshTokenKey}${admin.adminId}`,
    );
    if (!admin.isActive) {
      admin.isActive = true;
      await this.adminRepository.createOrUpdate(admin);
    }
    return await this.getAuthAdminData(admin, adminRefreshToken);
  }

  private async getAuthAdminData(
    admin: Admin,
    oldRefreshToken: string,
  ): Promise<AuthAdminResponse> {
    const { token, refreshToken } = await this.createPayload(
      admin,
      oldRefreshToken,
    );

    return {
      token,
      refreshToken,
      adminData: {
        adminId: admin.adminId,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        isSuperAdmin: admin.isSuperAdmin,
        isActive: admin.isActive,
      },
    };
  }

  private async createPayload(
    admin: Admin,
    oldRefreshToken: string,
  ): Promise<{
    token: string;
    refreshToken: string;
  }> {
    const uniqString = uuidv4();
    const newRefreshToken = Password.hash(uniqString);

    const payload = {
      id: admin.adminId,
      email: admin.email,
    };

    const token = this.jwtService.sign(payload);

    if (oldRefreshToken) {
      await this.keyValueStorageService.delete(
        `${KEY_VALUE_STORAGE_KEYS_ENUM.refreshTokenKey}${oldRefreshToken}`,
      );
    }

    await this.keyValueStorageService.set(
      `${KEY_VALUE_STORAGE_KEYS_ENUM.refreshTokenKey}${newRefreshToken}`,
      admin.adminId,
    );

    await this.keyValueStorageService.set(
      `${KEY_VALUE_STORAGE_KEYS_ENUM.adminRefreshTokenKey}${admin.adminId}`,
      newRefreshToken,
    );

    return {
      token,
      refreshToken: newRefreshToken,
    };
  }

  public async resetPassword(resetPasswordAdminDto: ResetPasswordAdminDto) {
    const { password, repeatPassword, token } = resetPasswordAdminDto;
    if (password !== repeatPassword) {
      throw new BadRequestException();
    }
    const { id: adminId, email } = await this.jwtService.verify(token);
    const existingToken = await this.keyValueStorageService.get(
      `${KEY_VALUE_STORAGE_KEYS_ENUM.adminPasswordResetToken}${adminId}`,
    );

    if (existingToken !== token) {
      throw new BadRequestException();
    }
    const admin = await this.adminRepository.findByOrThrow({
      email,
      adminId,
    });

    await this.adminRepository.createOrUpdate({
      ...admin,
      password: Password.hash(password),
    });

    await this.keyValueStorageService.delete(
      `${KEY_VALUE_STORAGE_KEYS_ENUM.adminPasswordResetToken}${adminId}`,
    );

    return;
  }

  public async forgotPassword(dto: ForgotPasswordAdminDto) {
    const { email } = dto;
    const admin = await this.adminRepository.findByOrThrow({
      email,
    });

    const token = this.jwtService.sign({
      id: admin.adminId,
      email: admin.email,
    });

    await this.keyValueStorageService.setex(
      `${KEY_VALUE_STORAGE_KEYS_ENUM.adminPasswordResetToken}${admin.adminId}`,
      config.token.tokenResetPasswordExpiration,
      token,
    );

    const emailTransporter = getEmailTransport();
    await emailTransporter.sendMail({
      subject: 'Test',
      text: 'Test',
      to: email,
      html: `<b>${token}</b>`,
    });
    return token;
  }
}
