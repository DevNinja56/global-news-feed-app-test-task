import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
// @Controller
import { BookmarkController } from './bookmark.controller';
// @Services
import { BookmarkService } from './service/bookmark.service';
// @Repositories
import { BookmarkRepository } from './repository/bookmark.repository';
// @Schema
import { Bookmark, BookmarkSchema } from './schema/bookmark.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bookmark.name, schema: BookmarkSchema },
    ]),
  ],
  controllers: [BookmarkController],
  providers: [BookmarkService, BookmarkRepository],
})
export class BookmarkModule {}
