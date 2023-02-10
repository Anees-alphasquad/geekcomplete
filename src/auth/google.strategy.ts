import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID:
        '354389036511-9hkgau0uav0lus122evqetq9o8k9slh5.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { name, emails, photos } = profile;
      const user = {
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos[0].value,
        refreshToken,
        accessToken,
      };
      console.log(profile);
      done(null, user);

      const newUser = await this.authService.validateSocialUser(
        user.email,
        user.picture,
        user.firstName,
        user.accessToken,
      );
      // console.log(newUser)
      return newUser;
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
