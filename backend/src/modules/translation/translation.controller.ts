import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Res,
  HttpStatus,
  HttpException,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
// @Services
import { TranslationService } from './service/translation.service';
// @Utils
import { generalResponse } from 'src/utils';
import { CreateTranslationDto } from './dto';

@ApiTags('Translation')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Post('text')
  async createTranslation(
    @Res() response: Response,
    @Body() createTranslation: CreateTranslationDto,
  ) {
    try {
      const data =
        await this.translationService.getTranslation(createTranslation);

      if (data && data.trans) {
        generalResponse({
          response,
          message: 'Translated successfully',
          status: HttpStatus.OK,
          data: data.trans,
        });

        return;
      }

      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(error['message'], error['status']);
    }
  }
}
