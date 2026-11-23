
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator.js';
import type { UserRole } from '../../users/types/user-role.enum.js';

interface AuthenticatedRequest {
  user?: {
    id: string;
    email: string;
    role: UserRole;
    mustChangePassword: boolean;
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles?.length) {
      return true;
    }

    const request =
      context.switchToHttp().getRequest<AuthenticatedRequest>();

    if (!request.user || !requiredRoles.includes(request.user.role)) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    if (
      request.user.role === 'ORGANIZER' &&
      request.user.mustChangePassword
    ) {
      throw new ForbiddenException(
        'You must change your temporary password before accessing this feature',
      );
    }

    return true;
  }
}