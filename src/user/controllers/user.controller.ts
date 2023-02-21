import { ErrrorFilter } from './../../utils/errorFilter';
import { UpdateUserDto } from './../dto/UpdateUserDto';
import { createUserDto } from './../dto/userDto.dto';
import { UsersService } from './../service/user.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
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
      const users = await this.userServices.findAll(); //>
      if (!users || !users.length || users.length <= 0) {
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
      // checking for duplication
      const duplicateEmail = await this.userServices.findOne({
        email: body.email,
      });

      const duplicateUsername =
        body?.username &&
        (await this.userServices.findOne({ username: body.username }));
      console.log('duplicateEmail : ', duplicateEmail);
      console.log('duplicateEmail : ', duplicateUsername);

      const message =
        duplicateUsername && duplicateEmail
          ? `user with  email ${duplicateEmail.email} and  username ${duplicateUsername.username} already exist !`
          : duplicateUsername
          ? `user with  email ${duplicateUsername.username} already exist !`
          : duplicateEmail
          ? `user with  email ${duplicateEmail.email} already exist !`
          : null;

      if (Boolean(message)) {
        throw new HttpException(message, HttpStatus.CONFLICT);
      }

      const user = await this.userServices.create(body);
      console.log('here==================');
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

      if (userOpt?.id) {
        const duplicate = await this.userServices.findOne({ id });

        if (duplicate && duplicate.id !== user.id) {
          throw new HttpException(
            `user with ${duplicate.id} already exist !`,
            HttpStatus.CONFLICT,
          );
        }
      }

      return await this.userServices.updateOne(userOpt);
    } catch (err) {
      throw err;
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userServices.findOne({ id });
      if (!user) {
        throw new ErrrorFilter("user with the current id wasn't found", 404);
      }
      return this.userServices.deleteOne(id);
    } catch (err) {
      throw err;
    }
  }
}
