import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import config from '../../config';
import { DataSource } from 'typeorm';
import Admin from '../../db/entities/Admin';
import User from '../../db/entities/User';

const jwtSecret: string = config.token.secret;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly connection: DataSource) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    const admin = await this.connection.getRepository(Admin).findOne({
      where: {
        adminId: payload.id,
        email: payload.email,
      },
    });
    const user = await this.connection.getRepository(User).findOne({
      where: {
        userId: payload.id,
        email: payload.email,
      },
    });
    if (!admin && !user) {
      throw new ForbiddenException();
    }
    return {
      user,
      admin,
    };
  }
}
