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
  NotFoundException,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
// @Services
import { BookmarkService } from './service/bookmark.service';
// @Dto
import { CreateBookmarkDto, UpdateBookmarkDto } from './dto';
// @Utils
import { generalResponse } from 'src/utils';

@ApiTags('Bookmark')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  /**
   * @description create bookmark
   * @method POST
   * @param createBookmarkDto
   * @return newly created bookmark {}
   */
  @ApiBearerAuth()
  @UseGuards(AuthGuard('validate_token'))
  @Post()
  async create(
    @Res() response: Response,
    @Body() createBookmarkDto: CreateBookmarkDto,
  ) {
    try {
      const data = await this.bookmarkService.create(createBookmarkDto);

      generalResponse({
        response,
        message: 'Bookmark created successfully',
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
      const data = await this.bookmarkService.findAllWithPagination({
        page: page || 1,
        limit: limit || 10,
      });

      generalResponse({
        response,
        message: 'Records found successfully',
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
      const data = await this.bookmarkService.findAll({});

      generalResponse({
        response,
        message: 'Bookmark found successfully',
        status: HttpStatus.OK,
        data,
      });
    } catch (error) {
      throw new HttpException(error['message'], error['status']);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('validate_token'))
  @Get('user/:userId')
  async findAllByUserId(
    @Res() response: Response,
    @Param('userId') userId: string,
  ) {
    try {
      const data = await this.bookmarkService.findAll({
        filterQuery: {
          userId: {
            $eq: userId,
          },
        },
      });

      generalResponse({
        response,
        message: 'Bookmark found successfully',
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
      const data = await this.bookmarkService.findOne({ _id: id });
      if (!data) {
        throw new NotFoundException('Enter a valid Bookmark ID');
      }

      generalResponse({
        response,
        message: 'Bookmark found successfully',
        status: HttpStatus.OK,
        data,
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
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ) {
    try {
      const data = await this.bookmarkService.update(
        { _id: id },
        updateBookmarkDto,
      );

      generalResponse({
        response,
        message: 'Bookmark updated successfully',
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
      const data = await this.bookmarkService.remove({ _id: id });

      generalResponse({
        response,
        message: 'Bookmark deleted successfully',
        status: HttpStatus.OK,
        data,
      });
    } catch (error) {
      throw new HttpException(error['message'], error['status']);
    }
  }
}
