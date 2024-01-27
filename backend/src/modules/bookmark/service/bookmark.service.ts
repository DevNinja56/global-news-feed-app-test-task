import { Injectable } from '@nestjs/common';
// @Repositories
import { BookmarkRepository } from '../repository/bookmark.repository';
// @Services
import { EntityServices } from 'src/modules/common/entity.service';

@Injectable()
export class BookmarkService extends EntityServices {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {
    super(bookmarkRepository);
  }
}
