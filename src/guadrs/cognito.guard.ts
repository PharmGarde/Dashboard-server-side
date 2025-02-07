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
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    const payload = await this.userService.validateToken(token);

    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    request.user = {
      ...payload,
      groups: payload['cognito:groups'] || ['USER'],
    };
    
    console.log('User payload:', {
      sub: payload.sub,
      groups: payload['cognito:groups'],
      fullPayload: payload
    });

    return true;
  }
}