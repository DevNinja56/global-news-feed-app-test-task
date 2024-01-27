import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTranslationDto {
  @ApiProperty()
  @IsString({ message: 'Target Language Code be a string' })
  readonly targetLang: string;

  @ApiProperty()
  @IsString({ message: 'Text must be a string' })
  readonly text: string;
}
