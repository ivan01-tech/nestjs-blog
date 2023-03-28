import { UsersService } from './../user/service/user.service';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

/**
 * to check if a user with the specify id in the req?body exist
 */
export class checkIfUserExistGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

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
    })();

    return isUserExist;
  }
}
