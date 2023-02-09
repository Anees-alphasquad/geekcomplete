import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(email: string, password: string) {
    // find user in the database via email
    const user = await this.usersService.findUser(email, password);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    console.log(user);

    // compare passwords using bcrypt
    const checkPassword = compareSync(password, user.password);

    // if password doesn't match, return invalid credentials
    // TODO signup
    if (!checkPassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // if password matches, generate and return JWT
    const access_token = this.jwt.sign(user);
    return access_token;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUser(email, password);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateGoogleUser(email: string, displayPicture: string, userName: string, googleAccessToken: string) {

    const user = await this.usersService.findUserByEmail(email)

    if (!user) {
      const newUser = await this.prisma.users.create({
        data: {
          email, 
          displayPicture,
          userName,
          googleAccessToken,
          password: "test123" // update it with uuid
        }
      })
      const accessToken = this.jwt.sign(newUser)
      return {
        newUser, accessToken
      }
    }

    else {
      const access_token = this.jwt.sign(user)
      console.log(access_token)
      return access_token
    }
}


}
