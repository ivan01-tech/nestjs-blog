import { UpdateUserDto } from './../dto/UpdateUserDto';
import { UserInterface } from './../models/userType';
import { createUserDto } from './../dto/userDto.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Injectable } from '@nestjs/common';

import { UserEntity } from 'src/user/models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
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
}
