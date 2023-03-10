import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';
import { GithubStrategy } from './github.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { TwitterStrategy } from './twitter.strategy';
import { SessionSerializer } from './serializer';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, LocalStrategy, LocalAuthGuard, JwtStrategy, TwitterStrategy, GoogleStrategy, SessionSerializer,
    {
    provide: 'AUTH_SERVICE',
    useClass: AuthService
  }, 
  GithubStrategy, PrismaModule],
  imports: [PassportModule.register({session: true}), PrismaModule, ConfigModule, UsersModule, JwtModule.register({
    secret: jwtConstants.secret, signOptions: {expiresIn: '6000s'},
}),]
})
export class AuthModule {}
