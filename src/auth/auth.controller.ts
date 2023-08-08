import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}
  @Get('signup')
  signup(): string {
    return this.authservice.signup();
  }
  @Post('signin')
  signin(): { msg: string } {
    return this.authservice.signin();
  }
}
