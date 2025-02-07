import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Controller("auth")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    const { email, password, givenName, familyName, phoneNumber, user_role } =
      createUserDto;
    return this.userService.registerUser(
      email,
      password,
      givenName,
      familyName,
      phoneNumber,
      user_role
    );
  }

  @Post("login")
  async login(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    return this.userService.authenticateUser(email, password);
  }

  @Post("verify")
  async verify(@Body() body: { email: string; code: string }) {
    return this.userService.verifyUser(body.email, body.code);
  }
}
