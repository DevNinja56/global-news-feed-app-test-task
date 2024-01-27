import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document, Types } from 'mongoose';

@Schema({
  toJSON: {
    virtuals: true,
    transform: function (doc: any, ret: any) {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
  timestamps: true,
})
export class Bookmark extends Document {
  @Prop({
    type: 'string',
    required: true,
  })
  title: string;

  @Prop({
    type: 'string',
    required: true,
  })
  link: string;

  @Prop({
    type: 'string',
    required: true,
  })
  photoUrl: string;

  @Prop({
    type: 'string',
    required: true,
  })
  publishedDate: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Users',
    required: true,
  })
  userId: Types.ObjectId;
}

export type BookmarkDocument = HydratedDocument<Bookmark>;
export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
