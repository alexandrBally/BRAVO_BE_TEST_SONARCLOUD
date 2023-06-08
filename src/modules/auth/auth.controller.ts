import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequest } from './dto/sign-up.request';
import { SignInRequest } from './dto/sign-in.request';

import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { JwtAdminGuard } from '../../common/guards/admin-auth.guard';
import { ForgotPasswordAdminDto } from './dto/forgot-password-admin-request.dto';
import { ResetPasswordAdminDto } from './dto/reset-password-admin-request.dto';
@Controller('admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('invite')
  @UseGuards(JwtAuthGuard, JwtAdminGuard)
  invite(@Body() signUpnDto: SignUpRequest) {
    return this.authService.signUp(signUpnDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('forgot-password')
  forgotPassword(@Body() updateAdminDto: ForgotPasswordAdminDto) {
    return this.authService.forgotPassword(updateAdminDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('reset-password')
  resetPassword(@Body() resetPasswordAdminDto: ResetPasswordAdminDto) {
    return this.authService.resetPassword(resetPasswordAdminDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInRequest): Promise<void> {
    return this.authService.signIn(signInDto);
  }
}
