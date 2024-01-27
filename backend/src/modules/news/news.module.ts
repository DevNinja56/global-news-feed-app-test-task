import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

// @Services
import { NewsService } from './service/news.service';
import { NewsController } from './news.controller';

@Module({
  imports: [HttpModule],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
