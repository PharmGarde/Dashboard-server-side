import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { User } from './types/User';

@Injectable()
export class UserService {
  private cognitoIdentityServiceProvider: AWS.CognitoIdentityServiceProvider;
  private readonly logger = new Logger(UserService.name);

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
    try {
      // First, authenticate the user
      const authParams = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.COGNITO_CLIENT_ID,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      };

      const authResult = await this.cognitoIdentityServiceProvider
        .initiateAuth(authParams)
        .promise();

      // Get user attributes from Cognito
      const userParams = {
        AccessToken: authResult.AuthenticationResult.AccessToken,
      };

      const userAttributes = await this.cognitoIdentityServiceProvider
        .getUser(userParams)
        .promise();

      // Convert Cognito attributes to your User type
      const user = this.mapCognitoAttributesToUser(
        userAttributes.UserAttributes,
      );

      return {
        accessToken: authResult.AuthenticationResult.AccessToken,
        user: user,
      };
    } catch (error) {
      console.error('Authentication error:', error);
      throw new Error(error.message || 'Authentication failed');
    }
  }

  private mapCognitoAttributesToUser(attributes: any[]): User {
    const attributeMap = {};
    attributes.forEach((attr) => {
      attributeMap[attr.Name] = attr.Value;
    });

    return {
      givenName: attributeMap['given_name'] || '',
      familyName: attributeMap['family_name'] || '',
      email: attributeMap['email'] || '',
      phoneNumber: attributeMap['phone_number'] || '',
      user_role: attributeMap['custom:user_role'] || 'user',
      avatar: attributeMap['picture'] || undefined,
      cognitoId: attributeMap['sub'] || '',
    };
  }

  async verifyUser(email: string, code: string) {
    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email, // Use email for verification
      ConfirmationCode: code,
    };

    return this.cognitoIdentityServiceProvider.confirmSignUp(params).promise();
  }

  async getUsers(): Promise<User[]> {
    try {
      const params = {
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        AttributesToGet: [
          'email',
          'given_name',
          'family_name',
          'phone_number',
          'custom:user_role',
          'picture',
          'sub',
        ],
      };

      this.logger.debug(
        `Fetching users with params: ${JSON.stringify(params)}`,
      );

      const result = await this.cognitoIdentityServiceProvider
        .listUsers(params)
        .promise();

      this.logger.debug(`Found ${result.Users?.length || 0} users`);

      // Map the Cognito users to your User type
      const users: User[] = result.Users.map((cognitoUser) => {
        const attributes = {};
        cognitoUser.Attributes.forEach((attr) => {
          attributes[attr.Name] = attr.Value;
        });

        return {
          givenName: attributes['given_name'] || '',
          familyName: attributes['family_name'] || '',
          email: attributes['email'] || '',
          phoneNumber: attributes['phone_number'] || '',
          user_role: attributes['custom:user_role'] || 'user',
          avatar: attributes['picture'] || undefined,
          cognitoId: attributes['sub'] || '',
          status: cognitoUser.UserStatus,
          enabled: cognitoUser.Enabled,
          createdAt: cognitoUser.UserCreateDate,
        };
      });

      return users;
    } catch (error) {
      this.logger.error('Error fetching users:', error);
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
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
