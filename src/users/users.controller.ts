import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AwsCognitoService } from 'src/aws/aws-cognito.service';
import { CreateUserDto } from './DTOs/create-user.dto';
import { CognitoAuthGuard } from 'src/guadrs/cognito.guard';

@UseGuards(CognitoAuthGuard)
@Controller('auth')
export class UsersController {
  constructor(private readonly awsCognitoService: AwsCognitoService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    return this.awsCognitoService.registerUser(email, password);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    return this.awsCognitoService.authenticateUser(email, password);
  }

  @Post('verify')
  async verify(@Body() body: { email: string; code: string }) {
    return this.awsCognitoService.verifyUser(body.email, body.code);
  }
}