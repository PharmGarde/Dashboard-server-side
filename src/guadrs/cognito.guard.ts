import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CognitoAuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header provided');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    try {
      const payload = await this.userService.validateToken(token);

      if (!payload) {
        throw new UnauthorizedException('Invalid token');
      }

      // Add user info to request
      request.user = {
        sub: payload.sub,
        email: payload.email,
        groups: payload['cognito:groups'] || ['USER'],
        ...payload,
      };

      console.log('Auth successful:', {
        sub: payload.sub,
        groups: payload['cognito:groups'],
        email: payload.email
      });

      return true;
    } catch (error) {
      console.error('Auth error:', error);
      throw new UnauthorizedException(
        error.message || 'Token validation failed'
      );
    }
  }
}
