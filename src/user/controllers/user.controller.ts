import { UpdateUserDto } from './../dto/UpdateUserDto';
import { createUserDto } from './../dto/userDto.dto';
import { UsersService } from './../service/user.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller({ path: 'users' })
export class UserController {
  constructor(
    @Inject(UsersService) private readonly userServices: UsersService,
  ) {}

  @Get()
  async getAllusers() {
    try {
      const users = await this.userServices.findAll();
      if (!users) {
        throw new NotFoundException();
      }
      return users;
    } catch (err) {
      throw err;
    }
  }

  @Post()
  async create(@Body() body: createUserDto) {
    try {
      const user = await this.userServices.create(body);
      if (!user) {
        throw new BadRequestException();
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() userOpt: UpdateUserDto) {
    try {
      const user = await this.userServices.findOne({ id });
      if (!user) throw new NotFoundException();

      return await this.userServices.updateOne(userOpt);
    } catch (err) {
      throw err;
    }
  }

  @Delete(':id')
  async delete(@Param('') id: number) {
    try {
      const user = await this.userServices.findOne({ id });

      if (!user) throw new NotFoundException();

      return await this.userServices.deleteOne(id);
    } catch (err) {
      throw err;
    }
  }
}
