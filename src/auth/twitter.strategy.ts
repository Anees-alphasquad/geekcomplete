import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {Strategy, Profile, VerifyCallback} from "passport-twitter-oauth2"
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, "twitter") {
    constructor(
        private configService: ConfigService,
        private prisma: PrismaService,
        private jwt: JwtService
      ) {
        super({
          clientID: configService.get<string>('TWITTER_CLIENT_ID'),
          clientSecret: configService.get<string>('TWITTER_SECRET_ID'),
          callbackURL: 'http://localhost:3000/auth/twitter/redirect'
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        cb: VerifyCallback,
      ): Promise<any> {

        console.log(Profile)
}
}