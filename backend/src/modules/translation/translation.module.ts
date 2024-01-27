import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

// @Services
import { TranslationService } from './service/translation.service';
import { TranslationController } from './translation.controller';

@Module({
  imports: [HttpModule],
  providers: [TranslationService],
  controllers: [TranslationController],
})
export class TranslationModule {}
