import { JwtService } from '@nestjs/jwt';
import { UserInterface } from './../../user/models/userType';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthServices {
  constructor(private jwtService: JwtService) {}
  async generateJWT(user: UserInterface) {
    return this.jwtService.signAsync(user);
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hashPassword: string) {
    return bcrypt.compare(password, hashPassword);
  }
}
