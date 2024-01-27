import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
// @Services
import { UserService } from './../../user/service/user.service';
// @Dto
import { SignInCredentialsDto, SignupCredentialsDto } from '../dto';
// @Repositories
import { AuthRepository } from '../repository/auth.repository';
// @Utils
import { compareHashValue, getHashValue } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
  ) {}

  async signUp(signupCredentialsDto: SignupCredentialsDto) {
    const { password } = signupCredentialsDto;

    const user = await this.userService.findOne({
      email: signupCredentialsDto.email,
    });

    if (user) {
      return { status: HttpStatus.CONFLICT, message: 'User already exists' };
    }

    const hashPassword = await getHashValue(password);

    // create password for user
    signupCredentialsDto.password = hashPassword;

    const data = await this.userService.create(signupCredentialsDto);

    if (data) {
      // create access and refresh token
      const accessToken = await this.authRepository.getAccessToken(data._id);
      const refreshToken = await this.authRepository.getRefreshToken(data._id);

      await this.authRepository.updateRefreshTokenInUser(
        refreshToken,
        data['id'],
      );

      return { accessToken, refreshToken, user: data };
    }

    return { status: HttpStatus.BAD_REQUEST, message: 'Something went wrong' };
  }

  async signIn(signInCredentialsDto: SignInCredentialsDto) {
    const { email, password } = signInCredentialsDto;
    // Find user
    const user: any = await this.userService.findOne({ email });

    if (!user) {
      throw new BadRequestException('Invalid Credential');
    }

    // Validate password
    const compareHash = await compareHashValue(password, user['password']);

    if (!compareHash) {
      throw new BadRequestException('Invalid Credential');
    }
    // create tokens
    const accessToken = await this.authRepository.getAccessToken(user.id);
    const refreshToken = await this.authRepository.getRefreshToken(user.id);
    // Update user refresh token
    await this.authRepository.updateRefreshTokenInUser(refreshToken, user.id);

    return { accessToken, refreshToken, user };
  }

  async signOut(id: string) {
    return this.authRepository.updateRefreshTokenInUser(null, id);
  }

  async getUser(condition: object) {
    return await this.userService.findOne(condition);
  }

  async getRefreshToken(token: string) {
    const userExist =
      await this.authRepository.getUserIfRefreshTokenMatches(token);

    return await this.authRepository.getNewAccessAndRefreshToken(userExist.id);
  }
}
