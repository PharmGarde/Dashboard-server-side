import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsCognitoService {
  private cognitoIdentityServiceProvider: AWS.CognitoIdentityServiceProvider;

  constructor() {
    AWS.config.update({
      region: process.env.AWS_REGION,
    });
    this.cognitoIdentityServiceProvider =
      new AWS.CognitoIdentityServiceProvider();
  }

  async registerUser(email: string, password: string) {
    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
      ],
    };

    return this.cognitoIdentityServiceProvider.signUp(params).promise();
  }

  async authenticateUser(email: string, password: string) {
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    return this.cognitoIdentityServiceProvider.initiateAuth(params).promise();
  }

  async verifyUser(email: string, code: string) {
    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
    };

    return this.cognitoIdentityServiceProvider.confirmSignUp(params).promise();
  }
}
