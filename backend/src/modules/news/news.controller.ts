import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Res,
  HttpStatus,
  HttpException,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
// @Services
import { NewsService } from './service/news.service';
// @Utils
import { generalResponse } from 'src/utils';

@ApiTags('News')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('')
  async getNews(
    @Res() response: Response,
    @Query('country') countryCode: string,
  ) {
    try {
      const data = await this.newsService.getNews(countryCode);

      if (data['status'] === 'OK') {
        generalResponse({
          response,
          message: 'News found successfully',
          status: HttpStatus.OK,
          data: data['data'],
        });

        return;
      }

      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(error['message'], error['status']);
    }
  }
}
