import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './gaurds';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('login') 
  async login(@Body('email') email: string, @Body('password')password: string){
    return this.authService.login(email, password)
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google-auth')
  async handleLogin() {
    return { msg: 'Google Authentication' }
  }
   
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect') 
  async handleRedirect() {
    return { msg: 'OK' }
  }
}