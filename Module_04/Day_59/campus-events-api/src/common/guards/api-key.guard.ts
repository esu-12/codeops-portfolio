
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];

    if (!process.env.CLASSROOM_API_KEY) {
      throw new UnauthorizedException('API key is not configured');
    }

    if (apiKey !== process.env.CLASSROOM_API_KEY) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}