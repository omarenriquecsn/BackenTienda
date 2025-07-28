import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../../enum/roles.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean  {
    const rolesVerify = this.reflector.getAllAndOverride<Roles[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const user = request.user

    const hasRole = () => rolesVerify.some((role) => user.roles?.includes(role))

    const valid = user && user.roles && hasRole()
    if(!valid) {
        throw new ForbiddenException('No tiene acceso a esta ruta')
    }
    return valid;
  }
}
