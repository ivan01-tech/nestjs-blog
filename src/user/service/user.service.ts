import { ErrrorFilter } from './../../utils/errorFilter';
import { AuthServices } from 'src/auth/services/auth.service';
import { UpdateUserDto } from './../dto/UpdateUserDto';
import { UserInterface } from './../models/userType';
import { createUserDto } from './../dto/userDto.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UserEntity } from 'src/user/models/user.entity';
import { SignInDto } from 'src/user/dto/signInDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @Inject(AuthServices) private readonly authServices: AuthServices,
  ) {}

  async create(createuser: createUserDto): Promise<UserInterface> {
    return this.userRepository.save(createuser);
  }

  async findAll(): Promise<UserInterface[]> {
    return this.userRepository.find();
  }

  /**
   * to find a single user with some creteria
   * @param creteria
   * @returns
   */
  async findOne(creteria: UpdateUserDto) {
    return this.userRepository.findOneBy(creteria);
  }

  async updateOne(
    updateuser: UpdateUserDto,
  ): Promise<UpdateUserDto & UserEntity> {
    return this.userRepository.save(updateuser);
  }
  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async deleteOne(id: number) {
    return this.userRepository.delete(id);
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
      const jwtToken = await this.authServices.generateJWT({ ...validate });

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

    const isSame = await this.authServices.comparePassword(
      password,
      user.password,
    );

    if (!isSame) throw new UnauthorizedException();

    return user;
  }
}
