import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  givenName: string;

  @IsString()
  familyName: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  user_role: string;
}

export class UpdateUserDto {
  @IsString()
  givenName?: string;

  @IsString()
  familyName?: string;

  @IsEmail()
  email?: string;

  @MinLength(6)
  password?: string;

  @IsString()
  phoneNumber?: string;

  @IsString()
  user_role?: string;
}