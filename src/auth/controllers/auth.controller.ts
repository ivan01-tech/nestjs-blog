import { SignInDto } from 'src/user/dto/signInDto';
import { AuthServices } from 'src/auth/services/auth.service';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

// TODO must write this and make it avaible globaly
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthServices) private readonly authServices: AuthServices,
  ) {}

  /**
   * @desc to register  a user
   * @route POST /users/login
   * @access public
   */
  @Get()
  async login(@Body() body: SignInDto) {
    return await this.authServices.login(body);
  }
}
