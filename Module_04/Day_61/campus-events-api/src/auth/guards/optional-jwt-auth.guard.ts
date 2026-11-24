import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    _info: any,
    context: ExecutionContext,
    _status?: any,
  ): TUser {
    const request = context.switchToHttp().getRequest<Request>();

    // Allow public access when no token is supplied.
    if (!request.headers.authorization) {
      return null as TUser;
    }

    // Reject invalid or expired tokens.
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid or expired token');
    }

    return user as TUser;
  }
}