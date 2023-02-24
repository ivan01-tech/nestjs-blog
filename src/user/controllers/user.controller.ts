import { AuthServices } from 'src/auth/services/auth.service';
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
  UseGuards,
} from '@nestjs/common';

import { SignInDto } from 'src/user/dto/signInDto';
import { userRoles } from 'src/utils/userRoles';
import { UserRolesDecorator } from 'src/user/decorators/user.decorator';
import { JwtStrategy } from 'src/auth/guards/jwt.strategy';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JWTAuthGuard } from 'src/auth/guards/JwtGuards.guard';

@Controller({ path: 'users' })
export class UserController {
  constructor(
    @Inject(UsersService) private readonly userServices: UsersService,
    @Inject(AuthServices) private readonly authServices: AuthServices,
  ) {}

  // make sure to hash the password before using the findOne methode
  /**
   * @desc get all users
   * @route GET /users
   * @access public
   */
  @Get()
  @UseGuards(JWTAuthGuard, RolesGuard)
  @UserRolesDecorator(userRoles.admin)
  async getAllusers() {
    try {
      const users = await this.userServices.findAll(); //>
      if (!users || !users.length || users.length <= 0) {
        throw new NotFoundException();
      }

      const userPropertyToSend = users.map(function (user) {
        const { password, ...result } = user;
        return result;
      });
      return userPropertyToSend;
    } catch (err) {
      throw err;
    }
  }

  /**
   * @desc ccreate a user
   * @route POST /users
   * @access private
   */
  @Post()
  // @UserRolesDecorator(userRoles.user)
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

      // hashing password
      const hashPassword = await this.authServices.hashPassword(body.password);

      const user = await this.userServices.create({
        ...body,
        password: hashPassword,
      });

      if (!user) {
        throw new BadRequestException();
      }

      // extract the password
      const { password, ...result } = user;
      console.log(password, result);

      return result;
    } catch (err) {
      throw err;
    }
  }

  /**
   * @desc Update user info
   * @route PATCH /users/:id
   * @access private
   */
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userOpt: UpdateUserDto,
  ) {
    try {
      const user = await this.userServices.findOne({ id });
      if (!user) throw new NotFoundException();

      if (userOpt?.id) {
        const duplicate = await this.userServices.findOne({ id });

        if (duplicate && duplicate.id !== user.id) {
          throw new HttpException(
            `user with id ${duplicate.id} already exist !`,
            HttpStatus.CONFLICT,
          );
        }

        if (userOpt.password) {
          const isSame = await this.authServices.comparePassword(
            userOpt.password,
            duplicate.password,
          );

          if (!isSame)
            throw new HttpException(
              'password does not match',
              HttpStatus.CONFLICT,
            );
        }
      }

      const newUser = await await this.userServices.updateOne(userOpt);
      const { password, emailToLowecase, ...rest } = newUser;

      return rest;
    } catch (err) {
      throw err;
    }
  }

  /**
   * @desc Delete a  user
   * @route DELETE /users/:id
   * @access Private
   */
  @Delete(':id')
  // @UserRolesDecorator(userRoles.admin)
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userServices.findOne({ id });
      if (!user) {
        throw new ErrrorFilter("user with the current id wasn't found", 404);
      }
      await this.userServices.deleteOne(id);

      return { message: `the user with id ${id} was deleted successfully !` };
    } catch (err) {
      throw err;
    }
  }

  /**
   * @desc to authenticate  a user
   * @route POST /users/login
   * @access public
   */
  @Post('login')
  async login(@Body() body: SignInDto) {
    return await this.userServices.login(body);
  }
}
