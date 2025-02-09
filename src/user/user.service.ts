import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

@Injectable()
export class UserService {
  private cognitoIdentityServiceProvider: AWS.CognitoIdentityServiceProvider;

  constructor() {
    AWS.config.update({
      region: process.env.AWS_REGION,
    });
    this.cognitoIdentityServiceProvider =
      new AWS.CognitoIdentityServiceProvider();
  }

  async registerUser(
    email: string,
    password: string,
    givenName: string,
    familyName: string,
    phoneNumber: string,
    user_role: string,
  ) {
    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: uuidv4(),
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'given_name',
          Value: givenName,
        },
        {
          Name: 'family_name',
          Value: familyName,
        },
        {
          Name: 'phone_number',
          Value: phoneNumber,
        },
        {
          Name: 'custom:user_role',
          Value: user_role,
        },
      ],
    };

    console.log('Registering user with params:', params);

    try {
      const result = await this.cognitoIdentityServiceProvider
        .signUp(params)
        .promise();
      console.log('User registered successfully:', result);
      return result;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  async authenticateUser(email: string, password: string) {
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: email, // Use email for authentication
        PASSWORD: password,
      },
    };

    return this.cognitoIdentityServiceProvider.initiateAuth(params).promise();
  }

  async verifyUser(email: string, code: string) {
    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email, // Use email for verification
      ConfirmationCode: code,
    };

    return this.cognitoIdentityServiceProvider.confirmSignUp(params).promise();
  }

  async validateToken(token: string): Promise<any> {
    try {
      const decoded = await this.cognitoIdentityServiceProvider
        .getUser({
          AccessToken: token,
        })
        .promise();

      return decoded;
    } catch (error) {
      console.error('Token validation failed:', error);
      return null;
    }
  }
}
