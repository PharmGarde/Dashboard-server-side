import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { CognitoAuthGuard } from '../guadrs/cognito.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  // @UseGuards(CognitoAuthGuard)
  async getUsers() {
    try {
      const users = await this.userService.getUsers();
      return {
        success: true,
        data: users,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to fetch users',
      };
    }
  }

  @Post('auth/register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { email, password, givenName, familyName, phoneNumber, user_role } =
      createUserDto;
    return this.userService.registerUser(
      email,
      password,
      givenName,
      familyName,
      phoneNumber,
      user_role,
    );
  }

  @Post('auth/login')
  async login(@Body() createUserDto: CreateUserDto) {
    try {
      const { email, password } = createUserDto;
      const authResponse = await this.userService.authenticateUser(
        email,
        password,
      );

      return {
        accessToken: authResponse.accessToken,
        user: authResponse.user,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Authentication failed');
    }
  }

  @Post('auth/verify')
  async verify(@Body() body: { email: string; code: string }) {
    return this.userService.verifyUser(body.email, body.code);
  }
}
