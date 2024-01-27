import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

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
export class Users extends Document {
  @Prop({
    type: 'string',
    required: true,
  })
  username: string;

  @Prop({
    type: 'string',
    required: true,
  })
  email: string;

  @Prop({
    type: 'string',
    required: false,
    default: '',
  })
  password: string;
}

export type UsersDocument = HydratedDocument<Users>;
export const UsersSchema = SchemaFactory.createForClass(Users);
