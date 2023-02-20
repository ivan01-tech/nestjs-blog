import { UpdateUserDto } from './../dto/UpdateUserDto';
import { UserInterface } from './../models/userType';
import { createUserDto } from './../dto/userDto.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createuser: createUserDto): Promise<UserInterface> {
    return this.userRepository.create(createuser);
  }

  async findAll(): Promise<UserInterface[]> {
    return this.userRepository.find();
  }

  async findOne(creteria: UpdateUserDto) {
    return this.userRepository.findOneBy(creteria);
  }

  async updateOne(
    updateuser: UpdateUserDto,
  ): Promise<UpdateUserDto & UserEntity> {
    return this.userRepository.save(updateuser);
  }

  async deleteOne(id: number) {
    return this.userRepository.delete(id);
  }
}
