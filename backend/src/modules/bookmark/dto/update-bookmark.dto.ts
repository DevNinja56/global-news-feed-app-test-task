import { PartialType } from '@nestjs/swagger';
// @Dto
import { CreateBookmarkDto } from './create-bookmark.dto';

export class UpdateBookmarkDto extends PartialType(CreateBookmarkDto) {}
