import { JwtService } from '@nestjs/jwt';
import { UserInterface } from './../../user/models/userType';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthServices {
  constructor(private jwtService: JwtService) {}

  /**
   * to generate a new JWT token
   * @param user
   * @returns
   */
  async generateJWT(user: UserInterface) {
    return this.jwtService.signAsync({ user });
  }
  /**
   * to hash a string passed as parameter which is considered to be the password using bcrypt
   * @param password
   * @returns
   */
  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
  /**
   * to compare a password with his hased value using the bcrypt package
   * @param password
   * @param hashPassword
   * @returns
   */
  async comparePassword(password: string, hashPassword: string) {
    return bcrypt.compare(password, hashPassword);
  }
}
