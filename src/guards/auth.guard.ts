import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.session.userID)
      throw new UnauthorizedException(
        'Please sign in to access this resource.'
      );
    return request.session.userID;
  }
}
