import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

export const HasRoles = (...roles: UserRole[]) => SetMetadata('roles', roles);
