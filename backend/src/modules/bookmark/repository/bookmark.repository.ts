import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// @Schema
import { Bookmark, BookmarkDocument } from '../schema/bookmark.schema';
// @Repositories
import { EntityRepository } from 'src/modules/common/repository/entity.repository';

@Injectable()
export class BookmarkRepository extends EntityRepository<Bookmark> {
  constructor(@InjectModel(Bookmark.name) classModel: Model<BookmarkDocument>) {
    super(classModel);
  }
}
