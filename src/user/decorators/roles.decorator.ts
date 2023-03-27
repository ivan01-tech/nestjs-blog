import { UserRoles } from '../../utils/userRoles';
import { SetMetadata } from '@nestjs/common';

export const hasRoles = (...rest: UserRoles[]) => {
  console.log('Roles : ', rest);
  return SetMetadata('roles', rest);
};
