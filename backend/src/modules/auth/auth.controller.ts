import {
  Post,
  Body,
  ValidationPipe,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpStatus,
  HttpException,
  Res,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// @Decorators
import { GetUser } from 'src/decorators/get-user.decorator';
// @Dto
import { SignInCredentialsDto, SignupCredentialsDto } from './dto';
// @Entities
import { Users } from '../user/schema/user.schema';
// @Services
import { AuthService } from './service/auth.service';
// @Utils
import { generalResponse } from 'src/utils';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async statusAPI(@Res() response: Response) {
    try {
      generalResponse({
        response,
        message: 'Server is up and running',
        status: HttpStatus.OK,
      });
    } catch (error) {
      throw new HttpException(error['message'], error['status']);
    }
  }

  // ********** User Register Process ********** //
  @Post('signup')
  async signUp(
    @Res() response: Response,
    @Body(ValidationPipe) signupCredentialsDto: SignupCredentialsDto,
  ) {
    try {
      const data = await this.authService.signUp(signupCredentialsDto);

      if (data && data['message'] && data['status']) {
        generalResponse({
          response,
          message: data['message'],
          status: data['status'],
        });
      } else {
        generalResponse({
          response,
          message: 'User created successfully',
          status: HttpStatus.CREATED,
          data,
        });
      }
    } catch (error) {
      throw new HttpException(error['message'], error['status']);
    }
  }

  @Post('signin')
  async signIn(
    @Res() response: Response,
    @Body(ValidationPipe) signInCredentialsDto: SignInCredentialsDto,
  ) {
    try {
      const data = await this.authService.signIn(signInCredentialsDto);
      response.cookie('accessToken', data.accessToken);

      generalResponse({
        response,
        message: `Session created successful`,
        status: HttpStatus.OK,
        data,
      });
    } catch (error) {
      throw new HttpException(error['message'], error['status']);
    }
  }

  @Get('logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('validate_token'))
  async logout(@Res() response: Response, @GetUser() user: Users) {
    try {
      await this.authService.signOut(user.id);

      generalResponse({
        response,
        message: `Session expired successful`,
        status: HttpStatus.OK,
      });
    } catch (error) {
      throw new HttpException(error['message'], error['status']);
    }
  }

  @Get('verify-user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('validate_token'))
  async refreshToken(@Req() request: Request, @Res() response: Response) {
    const token = request['token'];
    const user = request['user'];

    if (token && user) {
      generalResponse({
        response,
        message: `User verified successfully`,
        status: HttpStatus.OK,
        data: {
          token,
          user,
        },
      });
    }
  }
}
