import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// @Controller
import { AuthController } from './auth.controller';
// @Services
import { AuthService } from './service/auth.service';
// @JWT Strategy

import { LocalStrategy } from './jwt/local.strategy';
// @Configuration
import configuration from 'config/index';
// @Modules
import { UserModule } from '../user/user.module';
// @Repository
import { AuthRepository } from './repository/auth.repository';

const { jwt_token_secret, jwt_token_expiration } = configuration().jwt;

@Module({
  imports: [
    // Passport
    PassportModule.register({}),
    JwtModule.register({
      secret: jwt_token_secret,
      signOptions: {
        expiresIn: jwt_token_expiration,
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, LocalStrategy],
})
export class AuthModule {}
