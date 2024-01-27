import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import config from 'config';

const { real_time_news_data } = config();

@Injectable()
export class NewsService {
  constructor(private httpService: HttpService) {}

  async getNews(countryCode: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${real_time_news_data.url}?country=${countryCode}&lang=en`,
          {
            headers: {
              'X-RapidAPI-Key': real_time_news_data.api_key,
              'X-RapidAPI-Host': real_time_news_data.api_host,
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
