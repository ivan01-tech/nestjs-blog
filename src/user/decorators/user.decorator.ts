import { SetMetadata } from '@nestjs/common';

export const hasRoles = (...rest: number[]) => SetMetadata('roles', rest);
