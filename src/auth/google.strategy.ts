import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID:
        '575067738004-kdj7rgenf0qo20nmhmla9nc0hrimj8od.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {

    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      refreshToken,
      accessToken
    }

    const newUser = await this.authService.validateGoogleUser(user.email, user.picture, user.firstName, user.accessToken)
    // console.log(newUser)
    return newUser
  }
}
