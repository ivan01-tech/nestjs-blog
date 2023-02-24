export const matchRoles = (requiredRoles: string[], userRoles: string[]) =>
  requiredRoles
    .map((value) => {
      const v = userRoles.find((userRole) => value === userRole);
      console.log('first : ', v);
      return v;
    })
    .some(Boolean);
