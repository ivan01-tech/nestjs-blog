import { ErrrorFilter } from './../../utils/errorFilter';
import { SignInDto } from 'src/user/dto/signInDto';
import { UserEntity } from 'src/user/models/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from './../../user/models/userType';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthServices {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

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

  /**
   *  a function to authenticate the user , once he is registerd
   * @param user
   * @returns
   */
  login = async (user: SignInDto) => {
    try {
      const validate = await this.validate(user.email, user.password);

      if (!validate) {
        throw new UnauthorizedException();
      }
      console.log('validate : ', validate);
      const jwtToken = await this.generateJWT({ ...validate });

      if (!jwtToken)
        throw new ErrrorFilter('Unable to genreate the jwt token ', 500);

      return { access_token: jwtToken };
    } catch (err) {
      throw err;
    }
  };

  /**
   * To check user email and password before starting hashing the value
   * @param email
   * @param password
   * @returns
   */
  async validate(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new NotFoundException();

    const isSame = await this.comparePassword(password, user.password);

    if (!isSame) throw new UnauthorizedException();

    return user;
  }
}
