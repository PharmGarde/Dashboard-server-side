export interface User {
    givenName: string;
    familyName: string;
    email: string;
    phoneNumber: string;
    user_role: string;
    avatar?: string;
    cognitoId: string;
    status?: string;
    enabled?: boolean;
    createdAt?: Date;
  }
  