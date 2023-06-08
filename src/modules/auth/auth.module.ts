import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminRepository } from '../../db/repositories/admin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../../db';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import config from '../../config';
import { JwtStrategy } from '../../common/jwt/jwt-strategy';
import { KeyValueStorageModule } from '../key-value-storage-module/key-value-storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: config.token.secret,
      signOptions: { expiresIn: config.token.authExpiration },
    }),
    KeyValueStorageModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminRepository, JwtStrategy],
})
export class AuthModule {}
