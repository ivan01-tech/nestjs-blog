import { UserInterface } from '../../user/models/userType';
import { jwtConstant } from '../constant';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(jwtConstant.secret),
    });
  }

  async validate(payload: { user: UserInterface }) {
    console.log('payload111 : ', payload);
    return { user: payload.user };
  }
}
