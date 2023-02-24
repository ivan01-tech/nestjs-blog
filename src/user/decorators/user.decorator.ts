import { SetMetadata } from '@nestjs/common';

export const UserRolesDecorator = (...rest: number[]) =>
  SetMetadata('roles', rest);
