import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBookmarkDto {
  @ApiProperty()
  @IsString({ message: 'Title must be a string' })
  readonly title: string;

  @ApiProperty()
  @IsString({ message: 'Link must be a string' })
  readonly link: string;

  @ApiProperty()
  @IsString({ message: 'Photo URL must be a string' })
  readonly photoUrl: string;

  @ApiProperty()
  @IsString({ message: 'Published Date must be a string' })
  readonly publishedDate: string;

  @ApiProperty()
  @IsString({ message: 'User ID must be a string' })
  readonly userId: string;
}
