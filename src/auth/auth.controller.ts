import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GithubAuthGuard, GoogleAuthGuard, TwitterAuthGuard } from './gaurds';

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
    // const token = await this.authService.validateSocialUser();
    // res.cookie('access_token: ', token, {
    //   maxAge: 2592000000,
    //   sameSite: true,
    //   secure: false,
    // }) 
    return {msg: 'OK'}
  }

  @UseGuards(GithubAuthGuard)
  @Get('github-auth')
  async githubLogin() {
    return {msg: "Github Authentication"}
  }

  @UseGuards(GithubAuthGuard)
  @Get('github/redirect')
  async githubRedirect() {
    return {msg: 'OK'}
  }

  @UseGuards(TwitterAuthGuard)
  @Get('twitter-auth')
  async twitterLogin() {
    return {mes: "Twitter authentication"}
  }

  @UseGuards(TwitterAuthGuard)
  @Get('twitter/redirect')
  async twitterRedirect() {
    return {msg: 'OK'}
  }
}