import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    // find user in the database via email
    const user = await this.usersService.findUser(email, password)

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    console.log(user);

    // compare passwords using bcrypt
    const checkPassword = compareSync(password, user.password)

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
}
