import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import config from 'config';
import { CreateTranslationDto } from '../dto';

const { google_translate } = config();

@Injectable()
export class TranslationService {
  constructor(private httpService: HttpService) {}

  async getTranslation({ targetLang, text }: CreateTranslationDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          google_translate.url,
          {
            from: 'auto',
            to: targetLang,
            text,
          },
          {
            headers: {
              'X-RapidAPI-Key': google_translate.api_key,
              'X-RapidAPI-Host': google_translate.api_host,
            },
          },
        ),
      );

      return response.data;
    } catch (error) {
      throw new BadRequestException({
        error: (error as Error).message,
      });
    }
  }
}
