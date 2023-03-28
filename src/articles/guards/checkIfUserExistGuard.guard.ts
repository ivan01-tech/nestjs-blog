import { UsersService } from './../../user/service/user.service';
import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Request } from 'express';

// TODO disable it
/**
 * to check if a user with the specify id in the req?body exist
 */
export class checkIfUserExistGuard implements CanActivate {
  constructor(
    @Inject('UsersService') private readonly usersService: UsersService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // get the resquest object
    const req: Request = context.switchToHttp().getRequest();

    // get the id  provide in the request
    const { userId } = req.body;

    let isUserExist = false;

    // check if a user with the current id exist
    (async () => {
      const user = await this.usersService.findOne({ id: userId });
      console.log('user in the guard : ', user);
      isUserExist = Boolean(user);

      //TODO
    })();

    return isUserExist;
  }
}
