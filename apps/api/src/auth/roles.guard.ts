import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: UserRole[], userRoles: UserRole[]): boolean {
    const data = roles.some((role) => userRoles.includes(role));
    return data;
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context).getContext();
    const authorized = this.matchRoles(requiredRoles, ctx.req.user.role);
    if (!authorized) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }
    return authorized;
  }
}
