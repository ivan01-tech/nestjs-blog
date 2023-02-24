export const matchRoles = (roles: number[], userRoles: number[]) =>
  roles
    .map((value) => userRoles.find((userRole) => value == userRole))
    .some(Boolean);
