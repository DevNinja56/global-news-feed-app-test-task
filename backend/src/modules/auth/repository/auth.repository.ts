import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// @Services
import { UserService } from 'src/modules/user/service/user.service';
import Configuration from 'config/index';

const { jwt_token_secret } = Configuration().jwt;

@Injectable()
export class AuthRepository {
  constructor(
    private readonly userServices: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async updateRefreshTokenInUser(refreshToken: string, id: string) {
    if (refreshToken) {
      refreshToken = await bcrypt.hash(refreshToken, 10);
    }

    return this.userServices.update(
      { _id: id },
      {
        refresh_token: refreshToken,
      },
    );
  }

  async getAccessToken(id: string, expiresIn?: string) {
    return this.jwtService.sign(
      { _id: id },
      {
        secret: this.configService.get('jwt.jwt_token_secret'),
        expiresIn:
          expiresIn || this.configService.get('jwt.jwt_token_expiration'),
      },
    );
  }

  async getRefreshToken(id: string, expiresIn?: string) {
    return this.jwtService.sign(
      { _id: id },
      {
        secret: this.configService.get('jwt.jwt_refresh_token_secret'),
        expiresIn:
          expiresIn ||
          this.configService.get('jwt.jwt_refresh_token_expiration'),
      },
    );
  }

  async verifyToken(token: string) {
    this.jwtService.verify(token, {
      secret: jwt_token_secret,
    });

    const decodeToken: any = this.jwtService.decode(token, {
      json: true,
    });

    if (!decodeToken) {
      throw new UnauthorizedException();
    }

    // Find user
    const user = await this.userServices.findOne({
      email: decodeToken._id,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async getUserIfRefreshTokenMatches(refreshToken: string) {
    try {
      const user = await this.userServices.findOne({
        refresh_token: refreshToken,
      });
      if (!user) {
        throw new NotFoundException('Enter a valid address ID');
      }

      await this.updateRefreshTokenInUser(null, user.id);
      return user;
    } catch (error) {
      throw new HttpException(error['message'], error['status']);
    }
  }

  async getNewAccessAndRefreshToken(id: string) {
    const refreshToken = await this.getRefreshToken(id);
    await this.updateRefreshTokenInUser(refreshToken, id);

    return {
      accessToken: await this.getAccessToken(id),
      refreshToken: refreshToken,
    };
  }
}
