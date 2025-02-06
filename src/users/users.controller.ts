import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './DTOs/create-user.dto';
import { CognitoAuthGuard } from 'src/guadrs/cognito.guard';
import { UsersService } from './users.service';

@UseGuards(CognitoAuthGuard)
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    return this.usersService.registerUser(email, password);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    return this.usersService.authenticateUser(email, password);
  }

  @Post('verify')
  async verify(@Body() body: { email: string; code: string }) {
    return this.usersService.verifyUser(body.email, body.code);
  }
}