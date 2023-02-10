import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-github2';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private jwt: JwtService
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/github/redirect',
      args: { scope: 'user:email' }
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { email, username, profileUrl } = profile;
    // console.log((profile._json.email))
    // console.log(profile.email)

    const user = {
      email: profile._json.email,
      userName: username,
      displayPicture: profileUrl,
      _refreshToken,
      accessToken,
    };

    // console.log('Profile: ', profile);
    // console.log('Access_Token ', accessToken);

    done(null, user);

    const validateUser = await this.prisma.users.findMany({
        where: {
            userName: user.userName
        }
    }) 

    if (!validateUser[0]) {

        const hashPassword = hashSync("geekflare", 8)

      const newUser = await this.prisma.users.create({
        data: {
          email: `${username}` + '@githubauthenticated.com',
          userName: user.userName,
          displayPicture: user.displayPicture,
          password: hashPassword, // update it with uuid
          socialAccessToken: user.accessToken
        },
      });
      console.log("PASSWORD: ", hashPassword)

      const accessToken = this.jwt.sign(newUser);
      console.log("NEW_USER_ACCESS_TOKEN: ", accessToken)
      return {
        newUser,
        accessToken,
      };

    } else {
      const access_token = this.jwt.sign(user);
      console.log('EXISTING USER: ', access_token);
      return access_token;
    }
  }
}
