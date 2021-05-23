import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() input: LoginInput) {
    return this.authService.login(input.userName, input.password);
  }
}
