import { Role } from '@app/common';
import { SetMetadata } from '@nestjs/common';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // no guard for roels
    if (!roles) {
      return true;
    }

    // find user from request
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // check Role
    const hasRole = () => roles.some((role) => role == user.role);

    return hasRole();
  }
}
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
