import { UserRoles } from './userRoles';
export const matchRoles = (requiredRoles: string[], userRole: UserRoles) =>
  requiredRoles.includes(userRole);
