import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class CognitoAuthGuard implements CanActivate {
  private cognitoIdentityServiceProvider: AWS.CognitoIdentityServiceProvider;

  constructor() {
    AWS.config.update({
      region: process.env.AWS_REGION,
    });
    this.cognitoIdentityServiceProvider =
      new AWS.CognitoIdentityServiceProvider();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    try {
      const params = {
        AccessToken: token,
      };

      const user = await this.cognitoIdentityServiceProvider
        .getUser(params)
        .promise();

      request.user = user;
      return true;
    } catch (error) {
      return false;
    }
  }
}
