import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Res,
  HttpStatus,
  HttpException,
  BadRequestException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
// @Services
import { UserService } from './service/user.service';
// @Dto
import { UpdateUserDto, CreateUserDto, UpdatePasswordDto } from './dto';
// @Decorators
import { GetUser } from 'src/decorators/get-user.decorator';
// @Utils
import { compareHashValue, generalResponse, getHashValue } from 'src/utils';
// @Schema
import { Users } from './schema/user.schema';

@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @description create user
   * @method POST
   * @param createUserDto
   * @return newly created user {}
   */
  @ApiBearerAuth()
  @Post()
  async create(
    @Res() response: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      const { email, password } = createUserDto;

      const hashPassword = await getHashValue(password);

      const newUserDto = {
        ...createUserDto,
        password: hashPassword,
      };

      const user = await this.userService.findOne({
        email,
      });

      if (user) {
        return { status: HttpStatus.CONFLICT, message: 'User already exists' };
      }

      const data = await this.userService.create(newUserDto);

      generalResponse({
        response,
        message: 'User created successfully',
        status: HttpStatus.OK,
        data,
      });
    } catch (error) {
      throw new HttpException(error['message'], error['status']);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('validate_token'))
  @Get('paginated')
  async findAllPaginated(
    @Res() response: Response,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    try {
      const data = await this.userService.findAllWithPagination({
        page: page || 1,
        limit: limit || 10,
      });

      generalResponse({
        response,
        message: 'Users found successfully',
        status: HttpStatus.OK,
        data,
      });
    } catch (error) {
      throw new HttpException(error['message'], error['status']);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('validate_token'))
  @Get()
  async findAll(@Res() response: Response) {
    try {
      const data = await this.userService.findAll({});

      generalResponse({
        response,
        message: 'Users found successfully',
        status: HttpStatus.OK,
        data,
      });
    } catch (error) {
      throw new HttpException(error['message'], error['status']);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('validate_token'))
  @Get(':id')
  async findOne(@Res() response: Response, @Param('id') id: string) {
    try {
      const data = await this.userService.findOne({ _id: id });
      if (!data) {
        throw new NotFoundException('Enter a valid User ID');
      }

      generalResponse({
        response,
        message: 'User found successfully',
        status: HttpStatus.OK,
        data,
      });
    } catch (error) {
      throw new HttpException(error['message'], error['status']);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('validate_token'))
  @Post('change-password')
  async updatePassword(
    @Res() response: Response,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @GetUser() user: Users,
  ) {
    try {
      // Validate Password
      const compareHash = await compareHashValue(
        updatePasswordDto.currentPassword,
        user.password,
      );
      if (!compareHash) {
        throw new BadRequestException('Invalid Credential');
      }
      // Update User
      const hashPassword = await getHashValue(updatePasswordDto.newPassword);
      const data = await this.userService.update(
        { _id: user.id },
        { password: hashPassword },
      );
      // Send Response
      generalResponse({
        response,
        message: 'User password updated successfully',
        status: HttpStatus.OK,
        data: { ...data['_doc'] },
      });
    } catch (error) {
      throw new HttpException(error['message'], error['status']);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('validate_token'))
  @Patch(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const data = await this.userService.update({ _id: id }, updateUserDto);

      generalResponse({
        response,
        message: 'User updated successfully',
        status: HttpStatus.OK,
        data,
      });
    } catch (error) {
      throw new HttpException(error['message'], error['status']);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('validate_token'))
  @Delete(':id')
  async remove(@Res() response: Response, @Param('id') id: string) {
    try {
      const data = await this.userService.remove({ _id: id });

      generalResponse({
        response,
        message: 'User deleted successfully',
        status: HttpStatus.OK,
        data,
      });
    } catch (error) {
      throw new HttpException(error['message'], error['status']);
    }
  }
}
